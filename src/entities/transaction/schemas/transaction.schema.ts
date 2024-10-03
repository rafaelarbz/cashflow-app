import { z } from 'zod'
import { useTranslations } from '@/translations/translations'
import { TransactionTypeEnum } from '@/entities/transaction/enums/transaction-type.enum'
import { PaymentMethodEnum } from '@/entities/transaction/enums/payment-method.enum'

export const transactionSchema = (translations: typeof useTranslations) => z.object({
    id: z.string().uuid(),
    description: z.string().min(5, {
        message: translations.fields.size.min.replace('{min}', 5) 
    }),
    quantity: z.number().min(1),
    type: z.enum([
        TransactionTypeEnum.INCOME,
        TransactionTypeEnum.EXPENSE
    ], { 
        message: translations.fields.invalidEnum
    }),
    paymentMethod: z.enum([
        PaymentMethodEnum.BANK_TRANSFER,
        PaymentMethodEnum.CASH,
        PaymentMethodEnum.CREDIT_CARD,
        PaymentMethodEnum.DEBIT_CARD,
        PaymentMethodEnum.PAYPAL
    ], { 
        message: translations.fields.invalidEnum
    }),
    date: z.string().refine(value => !isNaN(Date.parse(value))),
    amount: z.number().nonnegative(),
    isZeroed: z.boolean(),
    formattedAmount: z.string(),
    repeat: z.boolean()
})

export const useTransactionSchema = () => {
    const translations = useTranslations()
    return transactionSchema(translations)
}

export type TransactionSchema = z.infer<ReturnType<typeof transactionSchema>>