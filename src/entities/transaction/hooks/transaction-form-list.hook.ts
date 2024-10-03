import { useCallback, useEffect, useState } from "react"
import { Transaction } from "@/entities/transaction/types/transaction.type"
import { useTranslations } from "@/translations/translations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransactionSchema } from "@/entities/transaction/schemas/transaction.schema"
import { 
    clearTransactions, 
    getStoredTransactions, 
    removeTransaction,
    saveOrUpdateTransaction,
} from "@/services/storageService/transaction.service"
import { Totals } from "@/entities/transaction/types/totals.type"
import { calculateTotals } from "@/utils/calculations"
import { toast } from "sonner"

export const useTransactionFormListHook = (initialValues: Transaction) => {
    const translations = useTranslations()

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [totals, setTotals] = useState<Totals>({  
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        paymentMethods: {}
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null)

    const form = useForm<Transaction>({
        defaultValues: transactionToEdit || initialValues,
        resolver: zodResolver(useTransactionSchema()),
    })

    const updateTransactions = useCallback(async () => {
        const storedTransactions = await getStoredTransactions();
        setTransactions(storedTransactions)
        const totals = await calculateTotals(storedTransactions)
        setTotals(totals)
    }, [])

    useEffect(() => {
        updateTransactions()
    }, [updateTransactions])

    const openModal = useCallback((isEditing?: boolean, transaction?: Transaction) => {
        setIsOpen(true)
        setTransactionToEdit(transaction || null)
        setIsEditing(isEditing || false)
        form.reset(transaction || initialValues)
    }, [form, initialValues])

    const closeModal = useCallback(() => {
        setIsOpen(false)
        setIsEditing(false)
        setTransactionToEdit(null)
        form.reset(initialValues)
    }, [form, initialValues])

    const sanitizeAmount = useCallback((formattedAmount: string) => {
        const sanitizedValue = formattedAmount.replace(/[^\d,.-]/g, '')
        if (sanitizedValue.includes(',')) {
            return Number(sanitizedValue.replace(/\./g, '').replace(',', '.'))
        }
        return Number(sanitizedValue.replace(/,/g, ''))
    }, [])

    const validateAmount = useCallback((amount: number, isZeroed: boolean) => {
        if (amount > 0 && !isZeroed || amount === 0 && isZeroed) {
            return true
        }
        return false
    }, [])

    const onSubmit = useCallback(async (data: Transaction) => {
        data.amount = sanitizeAmount(data.formattedAmount)

        if (!data.repeat) {
            data.quantity = 1
        }
        
        if (!validateAmount(data.amount, data.isZeroed)) {
            toast(translations.common.attention, {
                description: translations.fields.amountMustBePositive,
                position: 'top-right'
            });
            return
        }

        await saveOrUpdateTransaction(data)
        await updateTransactions()
        closeModal()
    }, [sanitizeAmount, validateAmount, translations, updateTransactions, closeModal])

    const deleteTransaction = useCallback(async (transactionId: string) => {
        await removeTransaction(transactionId, transactions)
        await updateTransactions()
    }, [transactions, updateTransactions])

    const clearAllTransactions = useCallback(async () => {
        await clearTransactions()
        await updateTransactions()
    }, [updateTransactions])

    return {
        transactions,
        isOpen,
        isEditing,
        transactionToEdit,
        form,
        totals,
        setIsOpen,
        setTransactionToEdit,
        openModal,
        closeModal,
        onSubmit,
        clearAllTransactions,
        deleteTransaction
    }
}