import { DataTable } from "@/components/common/data-table"
import { ActionMenu, IAction } from "@/components/common/action-menu"
import { formatCurrency, formatDate } from "@/utils/formatter"
import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "@/translations/translations"
import { Transaction } from "@/entities/transaction/types/transaction.type"

interface TransactionListProps {
    transactions?: Transaction[]
    startEditingTransaction: (transaction: Transaction) => void
    deleteTransaction: (transactionId: string) => void
}

export function TransactionList({ 
    transactions = [], 
    startEditingTransaction, 
    deleteTransaction  
}: TransactionListProps) { 
    const t = useTranslations()

    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "date",
            header: t.transactions.date,
            cell: ({ row }) => {
                return <>{formatDate(new Date(row.original?.date))}</>
            }
        },
        {
            accessorKey: "type",
            header: t.transactions.type,
            cell: ({ row }) => {
                return <>{t[row.original?.type]?.title}</>
            }
        },
        {
            accessorKey: "description",
            header: t.transactions?.description
        },
        {
            accessorKey: "paymentMethod",
            header: t.transactions.paymentMethod,
            cell: ({ row }) => {
                return <>{t.paymentMethods[row.original?.paymentMethod]}</>
            }
        },
        {
            accessorKey: "amount",
            header: t.transactions.amount,
            cell: ({row}) => {
                const transaction = row.original

                return <>
                    {!transaction?.isZeroed && `${transaction?.quantity} x `} {formatCurrency(transaction?.amount)}
                    {transaction?.quantity > 1 &&
                        <>
                            <br></br>
                            <small>Subtotal: {formatCurrency(transaction?.amount * transaction?.quantity)}</small>
                        </>
                    }
                </>
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original
    
                const actions: IAction[] = [
                    {
                        label: t.common.edit,
                        onClick: () => startEditingTransaction(transaction)

                    },
                    {
                        label: t.common.delete,
                        onClick: () => deleteTransaction(transaction.id)
                    }
                ]
    
                return <ActionMenu actions={actions} />
            }
        }
    ]

    return (
        <div className="rounded-md border">
            <DataTable 
                columns={columns}
                data={transactions} 
            />
        </div>
    )
}