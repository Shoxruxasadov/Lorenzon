import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { useStore } from "../../store/zustand";
import { HiMiniMusicalNote, HiMiniMicrophone, HiMiniFolder, HiMiniFolderMinus } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { HiHome } from "react-icons/hi";


export default function AdminSidebar() {
    const user = useStore(state => state.user)
    const { resolvedTheme } = useTheme()
    const pathname = usePathname()
    const links = [
        { title: "Dashboard", path: "/admin", icon: (<HiHome />) },
        { title: "Users", path: "/admin/users", icon: (<FaUserFriends />) },
        { title: "Songs", path: "/admin/songs", icon: (<HiMiniMusicalNote />) },
        { title: "Singers", path: "/admin/singers", icon: (<HiMiniMicrophone />) },
        { title: "Albums", path: "/admin/albums", icon: (<HiMiniFolder />) },
        { title: "Playlists", path: "/admin/playlists", icon: (<HiMiniFolderMinus />) },
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
        <nav id="admin-sidebar">
            <div className="wrapper">
                <Link href={"/"} className="logo">
                    <Image src={src} width={170} height={40} alt="Lorenzon" />
                </Link>
                <div className="category">
                    <div className="list">
                        {links.map(link => (
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
            </div>
            <div className="sidebar-bottom">
                <Link href={"/home"} className="logout">
                    <div className="data">
                        <img src={user ? (user.image ? user.image : "/other/unknown.user.webp") : "/other/unknown.user.webp"} alt="User" />
                        <div className="title">
                            <h3>{user.name ? user.name : "Lorenzon"}</h3>
                            <h4>@{user.username}</h4>
                        </div>
                    </div>
                    <div className="back">
                        <LuLogOut />
                    </div>
                </Link>
            </div>
        </nav>
    );
}
