import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useSearch } from "../../store/zustand";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function MainHeader() {
    const setSearch = useSearch((state) => state.setSearch);
    const search = useSearch((state) => state.search);
    const pathname = usePathname()
    const router = useRouter()

    function handleSearch(e) {
        if (e.key === 'Enter') {
            if (!e.target.value) router.push(`/home`)
            else router.push(`/search/${e.target.value}`)
        }
    }

    useEffect(() => {
        if (pathname && pathname.split("/")[1] == 'search' && pathname.split("/")[2]) setSearch(pathname.split("/")[2].replaceAll("%20", " "))
    }, [])

    function back() {
        if (!pathname) return
        const l = pathname.split("/").length - 1
        if (l == 1) return '/home'
        let path = '';
        for (let i = l - 1; i > 0; i--) {
            path += `/${pathname.split("/")[l - i]}`
        }
        return path
    }

    return (
        <header id="main-header">
            <div className="naviga">
                <Link href={`/${back()}`} name="back"><FiChevronLeft /></Link>
                <div className="path">
                    <p className={pathname && (pathname.split('/').length == 2 || pathname.startsWith('/album') || pathname.startsWith('/playlist')) ? "active" : ""}><span className={pathname && pathname.split('/')[1].startsWith("@") ? "username" : "page"}>{pathname && pathname.split('/')[1]}</span></p>
                    {pathname && !pathname.startsWith('/album') && !pathname.startsWith('/playlist') && (pathname.split('/').map((p, i) => (
                        (p && i > 1) && <p key={i} className={pathname.split('/').length - 1 == i ? "active" : ""}><FiChevronRight /><span>{p.replaceAll("%20", " ")}</span></p>
                    )))}
                </div>
            </div>
            <div className="manage">
                <div className="search">
                    <input type="text" placeholder="Search songs, singers, albums..." onKeyDown={handleSearch} onChange={(e) => setSearch(e.target.value)} value={search} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M9.58333 17.5C13.9556 17.5 17.5 13.9556 17.5 9.58332C17.5 5.21107 13.9556 1.66666 9.58333 1.66666C5.21108 1.66666 1.66667 5.21107 1.66667 9.58332C1.66667 13.9556 5.21108 17.5 9.58333 17.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.3333 18.3333L16.6667 16.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <Link href={pathname == '/notification' ? '/home' : '/notification'} className={pathname && pathname.split('/')[1] == "notification" ? "active" : ""} name="notification">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M19.34 14.49L18.34 12.83C18.13 12.46 17.94 11.76 17.94 11.35V8.82C17.94 6.47 16.56 4.44 14.57 3.49C14.05 2.57 13.09 2 11.99 2C10.9 2 9.92 2.59 9.4 3.52C7.45 4.49 6.1 6.5 6.1 8.82V11.35C6.1 11.76 5.91 12.46 5.7 12.82L4.69 14.49C4.29 15.16 4.2 15.9 4.45 16.58C4.69 17.25 5.26 17.77 6 18.02C7.94 18.68 9.98 19 12.02 19C14.06 19 16.1 18.68 18.04 18.03C18.74 17.8 19.28 17.27 19.54 16.58C19.8 15.89 19.73 15.13 19.34 14.49Z" fill="white" />
                        <path d="M14.83 20.01C14.41 21.17 13.3 22 12 22C11.21 22 10.43 21.68 9.87999 21.11C9.55999 20.81 9.31999 20.41 9.17999 20C9.30999 20.02 9.43999 20.03 9.57999 20.05C9.80999 20.08 10.05 20.11 10.29 20.13C10.86 20.18 11.44 20.21 12.02 20.21C12.59 20.21 13.16 20.18 13.72 20.13C13.93 20.11 14.14 20.1 14.34 20.07C14.5 20.05 14.66 20.03 14.83 20.01Z" fill="white" />
                    </svg>
                </Link>
            </div>
        </header>
    )
}
