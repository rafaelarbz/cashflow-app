export interface Totals {
    totalIncome: number,
    totalExpense: number,
    balance: number,
    paymentMethods: {
      [key: string]: { income: number, expense: number }
    }
}