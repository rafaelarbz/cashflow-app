import { TableData } from "@/services/pdf.service"
import { Transaction } from "@/entities/transaction/types/transaction.type" 
import { formatCurrency, formatDate } from "@/utils/formatter"
import { useTranslations } from "@/translations/translations"
import { Totals } from "@/entities/transaction/types/totals.type"
import { ListData } from "@/services/pdf.service"
import { createPdf } from "@/services/pdf.service"
import { useCallback } from "react"
import { ListItem } from "@/services/pdf.service"

export const useTransactionPdfGeneratorHook = () => {
    const translations = useTranslations()

    const buildTableData = (transactions: Transaction[]): TableData => {
      const headers = [
        translations.transactions.date,
        translations.transactions.type,
        translations.transactions.description,
        translations.transactions.paymentMethod,
        translations.transactions.amount,
      ]
      
      const values = transactions.map(transaction => [
        formatDate(new Date(transaction.date)),
        translations.transactions[transaction.type],
        transaction.description,
        translations.paymentMethods[transaction.paymentMethod],
        `${transaction.quantity} x ${transaction.formattedAmount} : ${formatCurrency(transaction.quantity * transaction.amount)}`,
      ])
      
      return {
        headers,
        values,
      }
    }

    const buildListData = (totals: Totals): ListData => {
      const items: ListItem[] = []
    
      items.push({
        label: `- ${translations.transactions.totals.income}: ${formatCurrency(totals.totalIncome)}`,
        children: 
          Object.entries(totals.paymentMethods)
          .filter(([method, details]) => details?.income > 0)
          .map(([method, details]) => ({
            label: `- ${translations.paymentMethods[method]}`,
            children: details?.income > 0 ? [
              { label: `${formatCurrency(details?.income)}` }
            ] : []
          }))
      })
    
      items.push({
        label: `- ${translations.transactions.totals.expense}: ${formatCurrency(totals.totalExpense)}`,
        children: 
          Object.entries(totals.paymentMethods)
          .filter(([method, details]) => details?.expense > 0)
          .map(([method, details]) => ({
            label: `- ${translations.paymentMethods[method]}`,
            children: [
              { label: `${formatCurrency(details?.expense)}` }
            ]
          }))
      })
    
      items.push({
        label: `- ${translations.transactions.totals.balance}: ${formatCurrency(totals.balance)}`,
        children: []
      })
    
      return {
        header: translations.transactions.totals.title,
        items
      }
    }
    
    const createPdfFromData = useCallback(async (transactions: Transaction[], totals: Totals) => {
      const tableData = buildTableData(transactions)
      const listData = buildListData(totals)
    
      await createPdf({
        title: translations.transactions.title,
        table: tableData,
        list: listData
      })
    }, [])

    return {
      createPdfFromData
    }
}