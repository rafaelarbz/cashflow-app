import { Transaction } from "@/entities/transaction/types/transaction.type" 

const STORAGE_KEY = 'transactions'

export function saveOrUpdateTransaction(transaction: Transaction): void {
    const storedTransactions = getStoredTransactions()
    const existingIndex = storedTransactions.findIndex(t => t.id === transaction.id)

    if (existingIndex > -1) {
        storedTransactions[existingIndex] = transaction
    } else {
        storedTransactions.unshift(transaction)
    }
  
    saveTransactions(storedTransactions)
}

export function removeTransaction(id: string, transactions: Transaction[]): void {
    const updatedTransactions = transactions.filter(t => t.id !== id)
    saveTransactions(updatedTransactions)
}

export function clearTransactions(): void {
    localStorage.removeItem(STORAGE_KEY)
}

export function getStoredTransactions(): Transaction[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}
  
function saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}