import { useTranslations } from "@/translations/translations"

export function Loader() {
    const translations = useTranslations()

    return (
        <div className="container p-5"> 
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
                <div className="flex pl-10 h-full justify-content-center md:justify-content-left">
                    <h1 className="text-4xl p-5 md:p-10 ">{translations.common.loading}</h1>
                </div>
            </div>
        </div>
    )
}