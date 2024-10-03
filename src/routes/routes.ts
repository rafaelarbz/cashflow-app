import { Home } from "@/pages/home"
import { RegisterTransactions } from "@/pages/register-transactions"
import { useTranslations } from "@/translations/translations"

export interface IRoute {
    name: string
    path: string
    visible: boolean
    element: () => JSX.Element
}

const getRoutes = (t: Record<string, unknown>): IRoute[] => [
    {
        name: (t.navigation as Record<string, unknown>).home as string,
        path: '/',
        visible: true,
        element: Home
    },
    {
        name: (t.navigation as Record<string, unknown>).transactions as string,
        path: '/transactions',
        visible: false,
        element: Home
    },
    {
        name: (t.navigation as Record<string, unknown>).registerTransactions as string,
        path: '/transactions/new',
        visible: true,
        element: RegisterTransactions
    }
]

export const useRoutes = () => {
    const translations = useTranslations();
    return getRoutes(translations);
}