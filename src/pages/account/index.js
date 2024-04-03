import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuthCreate } from "../../store/zustand";
import Wait from "../../components/loading/wait";
import Root from "../../layouts/root";

import { PiUserCirclePlusFill, PiXBold } from "react-icons/pi";

export default function Account() {
    const setPage = useAuthCreate(state => state.setPage);
    const [users, setUsers] = useState([])
    const [wait, setWait] = useState(true)
    const [token, setToken] = useLocalStorage("token", "null")
    const [accounts, setAccounts] = useLocalStorage("accounts", "null")
    const router = useRouter()

    const remove = (user) => setAccounts(accounts.filter((account) => account.id !== user._id))

    function getUsers() {
        const collectorUsers = []
        const end = () => { setUsers(collectorUsers); setWait(false); }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${accounts[0].id}`, { password: accounts[0].password }
        ).then(({ data }) => collectorUsers.push(data[0])
        ).finally(() => accounts.length > 1 ? axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${accounts[1].id}`, { password: accounts[1].password }
        ).then(({ data }) => collectorUsers.push(data[0])
        ).finally(() => accounts.length > 2 ? axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${accounts[2].id}`, { password: accounts[2].password }
        ).then(({ data }) => collectorUsers.push(data[0])
        ).finally(() => end()) : end()) : end())
    }

    useEffect(() => {
        if (accounts == "null" || accounts.length == 0) { router.push('/login'); return; }
        getUsers()
    }, [accounts])

    function signin(user) {
        setToken({ id: user._id, password: user.password })
        router.push("/home")
    }

    if (wait) return <Wait />
    return (
        <Root page="account" title="Switch account">
            <motion.div className="wrapper"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
            >
                <Link href={"/"} className="logo">
                    <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
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
                                    <img src={user.image ? user.image : "/other/not.user.png"} alt={user.name} />
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
                        <Link href={"/register"} className="register" onClick={() => setPage(1)}>
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

}



