import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { IRoute } from "@/routes/routes" 

type VerticalMenuProps = {
    routes: Array<IRoute>
    header?: React.ReactNode
}

export function VerticalMenu({routes, header}: VerticalMenuProps) {
    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" />
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader className="mb-6">
                    {header && header}
                </SheetHeader>
                <ul className="list-none text-md">
                    {routes && routes.map((route: IRoute, index: number) => (
                        route.visible &&
                        <li key={index} className="transition-colors hover:text-foreground/80 text-foreground/60 mb-2">
                            <a href={route.path}>{route.name}</a>
                        </li>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    )
}