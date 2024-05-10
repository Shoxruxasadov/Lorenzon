import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { wrong } from "../../utils/toastify";
import { useAuthCreate } from "../../store/zustand";
import useLocalStorage from "../../hooks/useLocalStorage";
import Error from "../../components/other/error";
import Wait from "../../components/loading/wait";
import Root from "../../layouts/root";

import { PiUserCirclePlusFill, PiXBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";

export default function Account() {
    const setPage = useAuthCreate(state => state.setPage);
    const [token, setToken] = useLocalStorage("token", "null")
    const [accounts, setAccounts] = useLocalStorage("accounts", "null")
    const { resolvedTheme } = useTheme()
    const router = useRouter()

    const { data: users, isLoading, isError, isSuccess, error, refetch } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/auth`, { headers: { 'accounts': JSON.stringify(accounts), 'secret': process.env.NEXT_PUBLIC_SECRET } }).then(({ data }) => data)
    })

    useEffect(() => {
        if (accounts == "null" || accounts.length == 0) { router.push('/login'); return; }
        if (isError) wrong(error.response.data.message)
        refetch()
    }, [accounts, isError])

    const remove = (user) => setAccounts(accounts.filter((account) => account.id !== user._id))
    const signin = (user) => {
        setToken({ id: user._id, password: user.password })
        router.push("/home")
    }

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

    if (isLoading) return <Wait />
    if (isSuccess) return (
        <Root page="account" title="Switch account">
            <motion.div className="wrapper"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
            >
                <Link href={"/"} className="logo">
                    <Image src={src} width={136} height={32} alt="Lorenzon" />
                </Link>
                <main>
                    {users.map(user => (
                        <div className="card" key={user._id}>
                            <div className="remove" onClick={() => remove(user)}>
                                <div className="title">
                                    <span>Remove Account</span>
                                    <div className="down-arrow"></div>
                                </div>
                                <PiXBold />
                            </div>
                            <div className="open" onClick={() => signin(user)}>
                                <div className="card-body">
                                    <img src={user.image || "/other/unknown.user.webp"} alt={user.name} />
                                </div>
                                <div className="card-footer">
                                    <p>{user.name.split(" ")[0]}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {users.length < 3 && <div className="create">
                        <Link href={"/login"} className="login">
                            <div className="create-body">
                                <PiUserCirclePlusFill />
                            </div>
                            <div className="create-footer">
                                <p>Add account</p>
                            </div>
                        </Link>
                        <Link href={"/signup"} className="signup" onClick={() => setPage(1)}>
                            <div className="create-footer">
                                <p>Create new account</p>
                            </div>
                        </Link>
                    </div>}
                </main>
                <footer>
                    <Image src="/logo/gray.png" width={22} height={22} alt="logo" />
                    <h1>Lorenzon</h1>
                    <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                    <p>You have {users.length} accounts</p>
                    <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                    <p>You can add up to three accounts</p>
                </footer>
            </motion.div>
        </Root>
    )
    return <Error />
}



