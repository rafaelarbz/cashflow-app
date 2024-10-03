import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useTranslations } from "@/translations/translations"
import { Button } from "@/components/ui/button"

export interface IAction {
    label: string
    onClick: () => void
}
  
interface ActionsMenuProps {
    actions: IAction[]
}

export function ActionMenu({ actions }: ActionsMenuProps) {
    const translations = useTranslations()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button 
                variant="secondary" 
                className="h-8 w-8 p-0"
            >
                <MoreHorizontal className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {translations.common.actions}
                </DropdownMenuLabel>
                {actions.map((action, index) => (
                    <div key={index}>
                        <DropdownMenuItem 
                            onClick={action.onClick}
                        >
                            {action.label}
                        </DropdownMenuItem>
                        {index < actions.length - 1 && <DropdownMenuSeparator />}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}