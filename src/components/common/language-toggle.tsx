import { useTranslation } from "react-i18next"
import { 
    DropdownMenu, 
    DropdownMenuContent,
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { I18N_STORAGE_KEY, SUPPORTED_LANGUAGES } from "@/configs"
import { useTranslations } from "@/translations/translations"

export function LanguageToggle() {
    const { i18n } = useTranslation()
    const translations = useTranslations()

    useEffect(() => {
        localStorage.setItem(I18N_STORAGE_KEY, i18n.language)
    }, [i18n.language])

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className={SUPPORTED_LANGUAGES.find((lang: Record<string, string>) => lang.code === i18n.language)?.icon || ''}></span>
                    <span className="sr-only">{translations.language.toggle}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {SUPPORTED_LANGUAGES.map((lang: Record<string, string>) => (
                    <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                        <span className={`${lang.icon} mr-2`}></span> {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
      </DropdownMenu>
    )
}