import { usePathname } from "next/navigation"
import Root from "../../layouts/root";

export default function Wait() {
    const pathname = usePathname()

    return (
        <Root page="wait" title={(pathname && pathname == '/') ? 'landing' : (pathname && pathname == '/home') ? 'home' : (pathname && pathname == '/login') ? 'login' : (pathname && pathname == '/signup') ? 'signup' : 'Loading...'}>
            <span className="loader"></span>
        </Root>
    )
}