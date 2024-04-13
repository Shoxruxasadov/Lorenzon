import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../../store/zustand";

import { HiMiniMusicalNote, HiMiniMicrophone, HiMiniFolder, HiMiniFolderMinus } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { HiHome } from "react-icons/hi";

export default function Sidebar() {
    const user = useStore(state => state.user)
    const pathname = usePathname()
    const links = [
        { title: "Users", path: "/admin/users", icon: (<FaUserFriends />) },
        { title: "Musics", path: "/admin/musics", icon: (<HiMiniMusicalNote />) },
        { title: "Albums", path: "/admin/albums", icon: (<HiMiniFolder />) },
        { title: "Playlists", path: "/admin/playlists", icon: (<HiMiniFolderMinus />) },
    ]

    return (
        <nav id="admin-sidebar">
            <div className="wrapper">
                <Link href={"/"} className="logo">
                    <Image src="/lorenzon/white.svg" width={170} height={40} alt="Lorenzon" />
                </Link>
                <div className="category">
                    <div className="list">
                        <Link key={"Dashboard"} href={"/admin"} className={pathname == "/admin" ? "active" : ""} >
                            <div className="svg"><HiHome /></div>
                            <span>Dashboard</span>
                        </Link>
                        {links.map(link => (
                            <Link
                                key={link.title}
                                href={link.path}
                                className={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}` === link.path ? "active" : ""}
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
