import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { RiUser3Fill, RiSettings4Fill, RiFolderMusicFill } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { HiMail, HiKey } from "react-icons/hi";
import { info } from "../../utils/toastify";

export default function SidebarSettings() {
    const { resolvedTheme } = useTheme()
    const pathname = usePathname()

    const mainLinks = [
        { title: "Public profile", path: "/settings", icon: (<RiUser3Fill />) },
        { title: "Manage plan", path: "/settings/plan", icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 15 15" className="corona" width="20" height="20"><path d="M11.3334 14.6667H4.66669C4.39335 14.6667 4.16669 14.44 4.16669 14.1667C4.16669 13.8933 4.39335 13.6667 4.66669 13.6667H11.3334C11.6067 13.6667 11.8334 13.8933 11.8334 14.1667C11.8334 14.44 11.6067 14.6667 11.3334 14.6667Z" /><path d="M13.5667 3.67999L10.9 5.58665C10.5467 5.83999 10.04 5.68665 9.88669 5.27999L8.62669 1.91999C8.41336 1.33999 7.59336 1.33999 7.38002 1.91999L6.11336 5.27332C5.96002 5.68665 5.46002 5.83999 5.10669 5.57999L2.44002 3.67332C1.90669 3.29999 1.20002 3.82665 1.42002 4.44665L4.19336 12.2133C4.28669 12.48 4.54002 12.6533 4.82002 12.6533H11.1734C11.4534 12.6533 11.7067 12.4733 11.8 12.2133L14.5734 4.44665C14.8 3.82665 14.0934 3.29999 13.5667 3.67999ZM9.66669 9.83332H6.33336C6.06002 9.83332 5.83336 9.60665 5.83336 9.33332C5.83336 9.05999 6.06002 8.83332 6.33336 8.83332H9.66669C9.94002 8.83332 10.1667 9.05999 10.1667 9.33332C10.1667 9.60665 9.94002 9.83332 9.66669 9.83332Z" /></svg>) },
        { title: "Account", path: "", icon: (<RiSettings4Fill />) },
    ]
    const securityLinks = [
        { title: "Emails", path: "", icon: (<HiMail />) },
        { title: "Password", path: "", icon: (<HiKey />) },
    ]
    const branchLinks = [
        { title: "Playlists", path: "", icon: (<RiFolderMusicFill />) },
    ]

    let src
    switch (resolvedTheme) {
        case 'light':
            src = '/lorenzon/logo.svg'
            break
        case 'dark':
            src = '/lorenzon/white.svg'
            break
        default:
            src = '/lorenzon/white.svg'
            break
    }

    return (
        <nav id="sidebar-setting">
            <Link href={'/home'} className="logo">
                <Image src={src} width={170} height={40} alt="Lorenzon" />
            </Link>
            <div className="category">
                <div className="list">
                    {mainLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.path || pathname}
                            className={`${pathname == link.path ? "active" : ""}`}
                            onClick={() => !link.path && info("Coming Soon!")}
                        >
                            <div className="svg">{link.icon}</div>
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="category">
                <h3>Security</h3>
                <div className="list">
                    {securityLinks.map(link => (
                        <Link
                            key={link.title}
                            href={link.path || pathname}
                            className={`${pathname == link.path ? "active" : ""}`}
                            onClick={() => !link.path && info("Coming Soon!")}
                        >
                            <div className="svg">{link.icon}</div>
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="category">
                <h3>Branch</h3>
                <div className="list">
                    {branchLinks.map(link => (
                        <Link
                            key={link.title}
                            href={link.path || pathname}
                            className={`${pathname == link.path ? "active" : ""}`}
                            onClick={() => !link.path && info("Coming Soon!")}
                        >
                            <div className="svg">{link.icon}</div>
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
