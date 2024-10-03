import i18n from 'i18next'
import { SUPPORTED_LANGUAGES } from '@/configs'

export function formatCurrency(amount: string | number): string {
    const numericValue = typeof amount ===  'string' ? parseFloat(amount) / 100 : amount

    if (isNaN(numericValue)) {
        return ""; 
    }

    const currentLanguage: string = i18n.language

    const currencyMap: Record<string, Record<string, string>> = {
        [SUPPORTED_LANGUAGES[0].code]: { code: 'en-US', currency: 'USD' },
        [SUPPORTED_LANGUAGES[1].code]: { code: 'pt-BR', currency: 'BRL' }
    }

    const { code: locale, currency } = 
        currencyMap[currentLanguage] || { code: 'pt-BR', currency: 'BRL' }

    const options: Intl.NumberFormatOptions = {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    return new Intl.NumberFormat(locale, options).format(numericValue)
}