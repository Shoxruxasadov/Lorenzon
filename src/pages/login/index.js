import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { wrong, success, warning } from "../../utils/toastify";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAuthCreate } from "../../store/zustand";
import Wait from "../../components/loading/wait";
import Root from "../../layouts/root";

import { MdAccountCircle, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [oauthGoogle, setOauthGoogle] = useLocalStorage('oauthGoogle', "null")
  const [accounts, setAccounts] = useLocalStorage("accounts", "null")
  const [token, setToken] = useLocalStorage("token", "null")
  const setPage = useAuthCreate(state => state.setPage);
  const setEmail = useAuthCreate(state => state.setEmail);
  const setName = useAuthCreate(state => state.setName);
  const setImage = useAuthCreate(state => state.setImage);
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(true)
  const [eye, setEye] = useState(false);
  const { data } = useSession()
  const router = useRouter()

  console.log(data);

  const auth = async (userData) => {
    setLoading(true)
    userData.login = "username"
    userData.user.split("").map(item => {
      if (item == "@") userData.login = "email"
    })

    const user = {
      login: userData.login,
      user: userData.user,
      password: userData.password
    }

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth`, user).then(({ data }) => {
      if (data[0]) {
        const account = { id: data[0]._id, password: data[0].password }
        setToken(account)

        if (userData.remember) {
          if (accounts == "null" || accounts.length == 0) {
            setAccounts([account])
          } else if (accounts.length == 1) {
            accounts[0].id !== account.id && setAccounts([...accounts, account])
          } else if (accounts.length == 2) {
            (accounts[0].id !== account.id && accounts[1].id !== account.id) && setAccounts([...accounts, account])
          }
        }

        success("You a signed in");
        setTimeout(() => router.push('/home'), 1000)
      } else {
        wrong("Wrong email or password");
      }
    }).catch(({message})=> wrong(message)).finally(() => setLoading(false))
  }

  const authGoogle = () => {
    setLoading(true);
    signIn("google")
    setOauthGoogle("signIn")
  }

  function handleValidation() {
    if (errors.user) warning("Enter email or username");
    if (errors.password) warning("Enter password");
  }

  useEffect(() => {
    localStorage.removeItem('oauthGoogle')
    if (accounts == "null") { setWait(false); return; }
    accounts.length >= 3 ? router.push("/account") : setWait(false)
  }, [])

  useEffect(() => {
    if (oauthGoogle == 'signIn' && data) {
      setLoading(true)
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/email/${data.user.email}`).then(res => {
        if (res.data.length == 0) {
          warning("You don't have an account, create one first")
          router.push("/register")
          setPage(5)
          setEmail(data.user.email)
          setName(data.user.name)
          setImage(data.user.image)
        } else {
          const account = { id: res.data[0]._id, password: res.data[0].password }
          setToken(account)

          if (accounts == "null" || accounts.length == 0) {
            setAccounts([account])
          } else if (accounts.length == 1) {
            accounts[0].id !== account.id && setAccounts([...accounts, account])
          } else if (accounts.length == 2) {
            (accounts[0].id !== account.id && accounts[1].id !== account.id) && setAccounts([...accounts, account])
          }

          success("You a signed in");
          router.push('/home')
        }
      }).finally(() => setLoading(false))
    }

    localStorage.removeItem('oauthGoogle')
  }, [data])

  if (wait) return <Wait />
  return (
    <Root page="login" title="Sign in">
      <motion.section
        initial={{ x: "-2rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="formes"
      >
        <Link href={"/"} className="logo">
          <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
        </Link>
        <div className="wrapper">
          <h1>Welcome Back!</h1>
          <p>Please fill your detail to access your account.</p>
          <form onSubmit={handleSubmit(auth)}>
            <label className="username" htmlFor="user">
              <MdAccountCircle />
              <input
                {...register("user", { required: true })}
                id="user"
                type="text"
                placeholder="Email or username"
                aria-invalid={errors.user ? "true" : "false"}
              />
            </label>
            <label className="password" htmlFor="password">
              <MdOutlinePassword />
              <input
                {...register("password", { required: true })}
                id="password"
                type={eye ? "text" : "password"}
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {eye ? (
                <FaEye className="eye" onClick={() => setEye(false)} />
              ) : (
                <FaEyeSlash className="eye" onClick={() => setEye(true)} />
              )}
            </label>
            <div className="remember">
              <div className="checkbox">
                <div className="cbx">
                  <input id="cbx" type="checkbox" {...register("remember")} />
                  <label htmlFor="cbx"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
                <label className="rememberme" htmlFor="cbx">Remember me</label>
              </div>
              <Link href={"/forget"}>Forget Password?</Link>
            </div>
            <button disabled={loading} onClick={handleValidation} type="submit">Sign in</button>
          </form>
          <div className="lines">
            <div className="line-start " />
            <span>or</span>
            <div className="line-end " />
          </div>
          <div className="providers">
            <button onClick={authGoogle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.501 12.2332C22.501 11.3699 22.4296 10.7399 22.2748 10.0865H12.2153V13.9832H18.12C18.001 14.9515 17.3582 16.4099 15.9296 17.3898L15.9096 17.5203L19.0902 19.935L19.3106 19.9565C21.3343 18.1249 22.501 15.4298 22.501 12.2332Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.214 22.5C15.1068 22.5 17.5353 21.5666 19.3092 19.9567L15.9282 17.3899C15.0235 18.0083 13.8092 18.4399 12.214 18.4399C9.38069 18.4399 6.97596 16.6083 6.11874 14.0766L5.99309 14.0871L2.68583 16.5954L2.64258 16.7132C4.40446 20.1433 8.0235 22.5 12.214 22.5Z"
                  fill="#34A853"
                />
                <path
                  d="M6.12046 14.0767C5.89428 13.4234 5.76337 12.7233 5.76337 12C5.76337 11.2767 5.89428 10.5767 6.10856 9.92337L6.10257 9.78423L2.75386 7.2356L2.64429 7.28667C1.91814 8.71002 1.50146 10.3084 1.50146 12C1.50146 13.6917 1.91814 15.29 2.64429 16.7133L6.12046 14.0767Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.2141 5.55997C14.2259 5.55997 15.583 6.41163 16.3569 7.12335L19.3807 4.23C17.5236 2.53834 15.1069 1.5 12.2141 1.5C8.02353 1.5 4.40447 3.85665 2.64258 7.28662L6.10686 9.92332C6.97598 7.39166 9.38073 5.55997 12.2141 5.55997Z"
                  fill="#EB4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className="replacement">
            <span>Don’t have an account? </span>
            <Link href={"/register"} onClick={() => setPage(1)}>Sign up</Link>
            <span> or </span>
            <Link href={"/account"}>Accounts</Link>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ x: "2rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="images"
      >
        <img src="/other/login.svg" alt="login" />
      </motion.section>
    </Root>
  )
}



