import { ptBR, enUS } from "date-fns/locale"
import { format } from "date-fns"
import i18n from "i18next"

export const formatDate = (date: Date): string => {
    const locale = i18n.language === 'pt' ? ptBR : enUS
    return format(date, 'PP', { locale: locale })
}

