import { useTranslations } from "../../translations/translations" 

export function NotFound() {
    const translations = useTranslations()

    return (
        <div className="mt-12 container overflow-hidden
            bg-[url('/images/taken.svg')] bg-center bg-no-repeat bg-contain justify-center" 
            style={{height: '500px'}}>
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                <div className="flex pl-10 h-full justify-content-center md:justify-content-left bg-white/[0.4] dark:bg-black/[0.4]">
                    <h1 className="text-4xl p-5 md:p-10 ">{translations.common.notFound}</h1>
                </div>
            </div>
        </div>
    )
}