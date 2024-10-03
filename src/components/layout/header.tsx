import { APP_NAME } from "@/configs"
import { ModeToggle } from "@/components/common/mode-toggle"
import { HorizontalMenu } from "@/components/common/horizontal-menu"
import { VerticalMenu } from "@/components/common/vertical-menu"
import { useRoutes } from "@/routes/routes"
import { LanguageToggle } from "@/components/common/language-toggle"

export function Header() {
    const routes = useRoutes()

    const verticalMenuHeader = (
        <a className="flex items-center gap-2">
            <img className="h-7 w-7" src="/images/cashflow-logo.svg" alt="logo"/>
            <span className="text-lg">{APP_NAME}</span>
        </a>
    )

    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-content-between">
                <div className="mr-4 hidden md:flex">
                    <a className="mr-4 flex items-center space-x-2 lg:mr-6">
                        <img className="h-7 w-7" src="/images/cashflow-logo.svg" alt="logo" title="Cash Flow"/>
                        <span className="hidden text-lg lg:inline-block">{APP_NAME}</span>
                    </a>
                    <HorizontalMenu routes={routes} />
                </div>
                <VerticalMenu routes={routes} header={verticalMenuHeader} />
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <LanguageToggle />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}