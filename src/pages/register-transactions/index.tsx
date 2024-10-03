import { useTranslations } from "../../translations/translations"
import { TransactionList } from "../../entities/transaction/components/list"
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader 
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { ActionMenu, IAction } from "../../components/common/action-menu"
import { TransactionForm } from "../../entities/transaction/components/form"
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger 
} from "../../components/ui/dialog"
import { useTransactionFormListHook } from "../../entities/transaction/hooks/transaction-form-list.hook"
import { Transaction } from "../../entities/transaction/types/transaction.type"
import { v4 as uuid4 } from 'uuid'
import { useCallback } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { formatCurrency } from "../../utils/formatter"
import { useTransactionPdfGeneratorHook } from "../../entities/transaction/hooks/transaction-pdf-generator.hook"

export function RegisterTransactions() {
    const translations = useTranslations()
    const initialValues: Transaction = {
        id: uuid4(),
        description: "",
        quantity: 1,
        type: "",
        paymentMethod: "",
        date: new Date().toISOString(),
        amount: 0,
        isZeroed: false,
        formattedAmount: "",
        repeat: false
    }
    const {
        transactions,
        isOpen,
        form,
        totals,
        setIsOpen,
        openModal,
        onSubmit,
        clearAllTransactions,
        deleteTransaction
    } = useTransactionFormListHook(initialValues)
    const { createPdfFromData } = useTransactionPdfGeneratorHook()

    const startEditingTransaction = useCallback((transaction: Transaction) => {
        openModal(true, transaction)
    }, [])

    const handleClearAllTransactions = useCallback(() => {
        clearAllTransactions()
    }, [])

    const cardHeaderActions: IAction[] = [
        {
            label: translations.common.clearAll,
            onClick: () => handleClearAllTransactions()
        },
        {
            label: translations.reports.exportPdf,
            onClick: () => createPdfFromData(transactions, totals)
        }
    ]

    const addTransactionDialog = () => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="secondary"
                    size="sm"
                    className="gap-1"
                    onClick={() => openModal}
                >
                    <PlusIcon/>
                    {translations.common.add}
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-[95vh]">
                <DialogHeader>
                    <DialogTitle>
                        {translations.transactions.singleTitle}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <TransactionForm
                        form={form}
                        onSubmit={onSubmit}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )

    return (
        <div className="container p-5"> 
            <div className="flex flex-row">
                <div className="w-full flex-shrink-0 flex-grow-0 
                    lg:pl-5 lg:pr-5 lg:pt-5
                    xl:pl-5 xl:pr-5 xl:pt-5">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <span>
                                        {translations.transactions.title}
                                    </span>

                                    <div className="flex self-end gap-2">
                                        {addTransactionDialog()}
                                        <ActionMenu actions={cardHeaderActions} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <TransactionList
                                    transactions={transactions}
                                    startEditingTransaction={startEditingTransaction}
                                    deleteTransaction={deleteTransaction}
                                />

                                <>
                                </>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>

                        <div className="pt-3">
                            <Card>
                                <CardHeader>
                                    {translations.transactions.totals.title}
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="income">
                                            <AccordionTrigger>
                                                {translations.transactions.totals.income}:
                                                {" "}
                                                {formatCurrency(totals.totalIncome)}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {totals && totals.totalIncome <= 0 && 
                                                    <span className="text-sm font-medium">
                                                        ---
                                                    </span>
                                                }
                                                {totals && totals.totalIncome > 0 && Object.entries(totals.paymentMethods).map(([method, details]) => (
                                                    <li key={method}>
                                                        <span className="text-sm font-medium">
                                                            {translations.paymentMethods[method]}:
                                                            {" "}
                                                            {formatCurrency(details?.income)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="expense">
                                            <AccordionTrigger>
                                                {translations.transactions.totals.expense}:
                                                {" "}
                                                {formatCurrency(totals.totalExpense)}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {totals && totals.totalExpense <= 0 && 
                                                    <span className="text-sm font-medium">
                                                        ---
                                                    </span>
                                                }
                                                {totals && totals.totalExpense > 0 && Object.entries(totals.paymentMethods).map(([method, details]) => (
                                                    <li key={method}>
                                                        <span className="text-sm font-medium">
                                                            {translations.paymentMethods[method]}:
                                                            {" "}
                                                            {formatCurrency(details?.expense)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <div className="text-sm font-medium pt-3">
                                        {translations.transactions.totals.balance}:
                                        {" "}
                                        {formatCurrency(totals.balance)}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                </div>
            </div>
        </div>
    )
}