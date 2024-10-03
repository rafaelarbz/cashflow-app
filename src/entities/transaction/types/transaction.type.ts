import { PaymentMethodEnum } from "@/entities/transaction/enums/payment-method.enum"
import { TransactionTypeEnum } from "@/entities/transaction/enums/transaction-type.enum"

export interface Transaction {
    id: string,
    description: string,
    quantity: number,
    type: typeof TransactionTypeEnum,
    paymentMethod: typeof PaymentMethodEnum,
    date: string,
    amount: number,
    isZeroed: boolean,
    repeat: boolean,
    formattedAmount: string
}