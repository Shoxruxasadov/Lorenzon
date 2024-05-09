import { usePathname } from "next/navigation"
import Root from "../../layouts/root";

export default function Wait() {
    const pathname = usePathname()

    return (
        <Root page="wait" title={(pathname && pathname == '/') ? 'Landing' :'Loading...'}>
            <span className="loader"></span>
        </Root>
    )
}