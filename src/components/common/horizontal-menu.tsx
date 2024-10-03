import { 
    NavigationMenu, 
    NavigationMenuList, 
    NavigationMenuItem, 
    NavigationMenuLink
} from "@/components/ui/navigation-menu"
import { IRoute } from "@/routes/routes" 

type HorizontalMenuProps = {
    routes: Array<IRoute>
}

export function HorizontalMenu({ routes }: HorizontalMenuProps) {
    return (
        <NavigationMenu className="flex items-center text-md">
            <NavigationMenuList className="gap-4 lg:gap-6">
                {routes.map((route: IRoute, index: number) => (
                    route.visible &&
                        <NavigationMenuItem key={index} className="transition-colors hover:text-foreground/80 text-foreground/60">
                            <NavigationMenuLink href={route.path} >
                                {route.name}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}