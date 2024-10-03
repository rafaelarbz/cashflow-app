import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { CONTACTS, APP_NAME } from "@/configs"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="p-2">
            <div className="container flex items-center justify-between gap-2 text-sm text-muted-foreground">
                <span>
                    &copy; {currentYear} {APP_NAME}
                </span>
                <div className="flex items-center gap-2">
                    <a target="blank" href={CONTACTS.linkedin}>
                        <LinkedInLogoIcon />
                    </a>
                    <a target="blank" href={CONTACTS.github}>
                        <GitHubLogoIcon />
                    </a>
                </div>
            </div>
        </footer>
    )
}