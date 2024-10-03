import { Footer } from "./footer"
import { Header } from "./header"
import { Main } from "./main"

type LayoutProps = {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <Main children={children} />
            <Footer />
        </div>
    )
}