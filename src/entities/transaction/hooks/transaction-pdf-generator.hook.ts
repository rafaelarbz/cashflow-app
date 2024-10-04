import { Transaction } from "@/entities/transaction/types/transaction.type"
import { formatCurrency, formatDate } from "@/utils/formatter"
import { useTranslations } from "@/translations/translations"
import { Totals } from "@/entities/transaction/types/totals.type"
import { createPdf, TableConfig, TableHeader } from "@/services/pdf.service"
import { RowInput } from "jspdf-autotable"
import { useCallback } from "react"
import { toast } from "sonner"

export const useTransactionPdfGeneratorHook = () => {
  const translations = useTranslations()

  const normalizeTransactionsData = (transactions: Transaction[]): TableConfig<RowInput> => {
    const headers: TableHeader[] = [
      { text: translations.transactions.date },
      { text: translations.transactions.type },
      { text: translations.transactions.description },
      { text: translations.transactions.paymentMethod },
      { text: translations.transactions.amount },
    ]

    const data: RowInput[] = transactions.map(transaction => [
      formatDate(new Date(transaction.date)),
      translations.transactions[transaction.type],
      transaction.description,
      translations.paymentMethods[transaction.paymentMethod],
      `${transaction.quantity} x ${transaction.formattedAmount} : ${formatCurrency(transaction.quantity * transaction.amount)}`
    ])

    return { headers, data }
  }

  const normalizeTotalsData = (totals: Totals): TableConfig<RowInput> => {
    const headers: TableHeader[] = [
      { text: translations.transactions.totals.title }
    ]

    const data: RowInput[] = []

    data.push([`${translations.transactions.totals.income}: ${formatCurrency(totals.totalIncome)}`])
    data.push([`${translations.transactions.totals.expense}: ${formatCurrency(totals.totalExpense)}`])
    data.push([`${translations.transactions.totals.balance}: ${formatCurrency(totals.balance)}`])
    
    Object.entries(totals.paymentMethods)
    .filter(([method, details]) => method && details?.income > 0)
    .map(([method, details]) => {
      data.push([`${translations.transactions.totals.income} - ${(translations.paymentMethods as Record<string, unknown>)[method]}: ${formatCurrency(details?.income)}`])
    })

    Object.entries(totals.paymentMethods)
    .filter(([method, details]) => method && details?.expense > 0)
    .map(([method, details]) => {
      data.push([`${translations.transactions.totals.expense} - ${(translations.paymentMethods as Record<string, unknown>)[method]}: ${formatCurrency(details?.expense)}`])
    })

    return { headers, data }
  }

  const createPdfFromData = useCallback(async (transactions: Transaction[], totals: Totals) => {
    try {
      const transactionsData = normalizeTransactionsData(transactions);
      const totalsData = normalizeTotalsData(totals);

      await createPdf({
        title: translations.transactions.title,
        tables: [
          { headers: transactionsData.headers, data: transactionsData.data },
          { headers: totalsData.headers, data: totalsData.data }
        ]
      });
    } catch (error: unknown) {
      toast(translations.feedback.error)
      console.log("PDF error: " + error)
    }
  }, [])

  return {
    createPdfFromData
  }
}