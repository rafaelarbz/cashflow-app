import { Form } from "@/components/ui/form"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTranslations } from "@/translations/translations"
import { DatePickerPopover } from "@/components/common/datepicker-popover"
import { CustomSelect } from "@/components/common/custom-select"
import { CustomInput } from "@/components/common/custom-input"
import { Label } from "@/components/ui/label"
import { MaskName } from "@/utils/mask.util"
import { Transaction } from "@/entities/transaction/types/transaction.type"
import { TransactionTypeEnum } from "@/entities/transaction/enums/transaction-type.enum"
import { PaymentMethodEnum } from "@/entities/transaction/enums/payment-method.enum"

interface TransactionFormProps {
    form: ReturnType<typeof useForm<Transaction>>
    onSubmit: (data: Transaction) => void
}

export function TransactionForm({ form, onSubmit }: TransactionFormProps) {
    const translations = useTranslations()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <DatePickerPopover 
                    control={form.control}
                    name="date"
                    label={translations.transactions.date}
                />

                <CustomSelect 
                    control={form.control}
                    name="type"
                    label={translations.transactions.type}
                    options={[
                        { value: TransactionTypeEnum.INCOME, label: translations.income.title },
                        { value: TransactionTypeEnum.EXPENSE, label: translations.expense.title }
                    ]}
                />

                <CustomInput
                    control={form.control}
                    name="description"
                    label={translations.transactions.description}
                    type="text"
                />

                <CustomSelect 
                    control={form.control}
                    name="paymentMethod"
                    label={translations.transactions.paymentMethod}
                    options={[
                        { value: PaymentMethodEnum.CASH, label: translations.paymentMethods.cash },
                        { value: PaymentMethodEnum.CREDIT_CARD, label: translations.paymentMethods.creditCard },
                        { value: PaymentMethodEnum.DEBIT_CARD, label: translations.paymentMethods.debitCard },
                        { value: PaymentMethodEnum.BANK_TRANSFER, label: translations.paymentMethods.bankTransfer }
                    ]} 
                />

                <div className="flex items-center space-x-2">
                    <Controller
                        name="isZeroed"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked: boolean) => 
                                        field.onChange(checked)
                                    }
                                />
                                <Label>
                                    {translations.transactions.zeroed}
                                </Label>
                            </>
                        )}
                    />
                </div>

                <CustomInput 
                    control={form.control}
                    name="formattedAmount"
                    label={translations.transactions.amount}
                    type="text"
                    maskName={MaskName.CURRENCY}
                    placeholder={translations.formats.currencyPlaceholder}
                    disabled={form.getValues('isZeroed')}
                />

                <div className="flex items-center space-x-2">
                    <Controller
                        control={form.control}
                        name="repeat"
                        render={({ field }) => (
                            <>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked: boolean) => 
                                        field.onChange(checked)
                                    }
                                    disabled={form.getValues('isZeroed')}
                                />
                                <Label>
                                    {translations.transactions.repeat}
                                </Label>
                            </>
                        )}
                    />
                </div>

                {form.getValues('repeat') &&
                    <CustomInput
                        control={form.control}
                        name="quantity"
                        type="number"
                        label={translations.transactions.repeatField}
                    />
                }

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <Button 
                        variant="secondary"
                        type="submit"
                    >
                        {translations.common.save}
                    </Button>
                </div>
            </form>
        </Form>
    )
}