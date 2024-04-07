import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Rodal from "rodal";
import axios from "axios";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { success, wrong } from "../../../utils/toastify";
import AdminLayout from "../../../layouts/admin";

import { HiSearch } from "react-icons/hi";

export default function AdminUsers() {
    const [user, setUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [userDeleted, setUserDeleted] = useState({})
    const [rodalDelete, setRodalDelete] = useState(false)
    const [token, setToken] = useLocalStorage("token", "null")
    const router = useRouter()

    useEffect(() => {
        verifyUser()
        getUsers()
    }, [])

    const getUsers = () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users`).then(({ data }) => setAllUsers(data)).finally(() => setLoading(false))
    const removeUser = () => axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/users/${userDeleted._id}`).then(() => success("Deleted user")).catch(() => wrong("Error")).finally(() => { setRodalDelete(false); getUsers() })
    const verifyUser = () => axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { password: token.password }).then(({ data }) => data[0].role == "admin" ? setUser(data[0]) : router.push('/')).catch(() => router.push('/'))

    return (
        <AdminLayout page="admin-users" title="Users">
            <header>
                <div className="category">
                    <h1>Users</h1>
                </div>
                <div className="others">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search users here..."
                        />
                        <HiSearch />
                    </div>
                    <div className="addUser">
                        <button onClick={() => router.push("/admin/users/add")}>Add user</button>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Birthday</th>
                                <th>Country</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user => (
                                <tr key={user._id}>
                                    <td onClick={() => router.push(`/@${user.username}`)}>
                                        <img src={user.image ? user.image : "/other/not.user.webp"} alt={user.name} />
                                        <div className="user">
                                            <div className="name">
                                                <h1>{user.name}</h1>
                                                {user.status === "premium" &&
                                                    <div className="verify">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 20 20" fill="none">
                                                            <path d="M9.53359 0.416756C9.79923 0.179395 10.2008 0.179395 10.4664 0.416756L12.8406 2.53818C12.9588 2.64382 13.1094 2.7062 13.2677 2.7151L16.4466 2.89382C16.8023 2.91382 17.0862 3.19775 17.1062 3.55342L17.2849 6.7323C17.2938 6.8906 17.3562 7.04118 17.4618 7.15941L19.5832 9.53359C19.8206 9.79923 19.8206 10.2008 19.5832 10.4664L17.4618 12.8406C17.3562 12.9588 17.2938 13.1094 17.2849 13.2677L17.1062 16.4466C17.0862 16.8023 16.8023 17.0862 16.4466 17.1062L13.2677 17.2849C13.1094 17.2938 12.9588 17.3562 12.8406 17.4618L10.4664 19.5832C10.2008 19.8206 9.79923 19.8206 9.53359 19.5832L7.15941 17.4618C7.04118 17.3562 6.8906 17.2938 6.7323 17.2849L3.55342 17.1062C3.19775 17.0862 2.91382 16.8023 2.89382 16.4466L2.7151 13.2677C2.7062 13.1094 2.64382 12.9588 2.53818 12.8406L0.416756 10.4664C0.179395 10.2008 0.179395 9.79923 0.416756 9.53359L2.53818 7.15941C2.64382 7.04118 2.7062 6.8906 2.7151 6.7323L2.89382 3.55342C2.91382 3.19775 3.19775 2.91382 3.55342 2.89382L6.7323 2.7151C6.8906 2.7062 7.04118 2.64382 7.15941 2.53818L9.53359 0.416756Z" fill="#6940ee"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 10 10" fill="none">
                                                            <path d="M2.08334 5.41666L3.75001 7.08332L7.91668 2.91666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </div>
                                                }
                                            </div>
                                            <p>{user.email}</p>
                                        </div>
                                    </td>
                                    <td><span className="username">@{user.username}</span></td>
                                    <td>{user.birthday && `${user.birthday.split("/")[2]}-${user.birthday.split("/")[1]}-${user.birthday.split("/")[0]}`}</td>
                                    <td style={{textTransform: "capitalize"}}>{user.country}</td>
                                    <td><span className={`pag ${user.gender ? user.gender == "male" ? "male" : "female" : ""}`}>{user.gender}</span></td>
                                    <td><span className={`pag ${user.role == "admin" ? "admin" : "simple"}`}>{user.role}</span></td>
                                    <td><button onClick={() => { setRodalDelete(true); setUserDeleted(user) }}>Delete</button></td>
                                </tr>
                            ))}
                            {loading && <tr className="loadingTable">
                                <td rowSpan={3} colSpan={7}>
                                    <div className="waiting">
                                        <span className="loader"></span>
                                    </div>
                                </td>
                             </tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            <Rodal className="rodal-delete" visible={rodalDelete} onClose={() => setRodalDelete(false)}>
                <h1>Delete it <span>{userDeleted.name && userDeleted.name.split(" ")[0]}</span> ?</h1>
                <div className="sure">
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={removeUser}>delete</button>
                </div>
            </Rodal>
        </AdminLayout>
    );
}
