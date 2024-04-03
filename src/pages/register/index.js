import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RegisterEmail from "../../components/auth/registerEmail";
import RegisterOTP from "../../components/auth/registerOTP";
import useLocalStorage from "../../hooks/useLocalStorage";
import Wait from "../../components/loading/wait";
import { useAuthCreate } from "../../store/zustand";
import RegisterPassword from "../../components/auth/registerPassword";
import RegisterAbout from "../../components/auth/registerAbout";
import GooglePassword from "../../components/auth/googlePassword";
import GoogleAbout from "../../components/auth/googleAbout";

export default function Register() {
  const page = useAuthCreate(state => state.page);
  const [accounts, setAccounts] = useLocalStorage("accounts", "null");
  const [wait, setWait] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (accounts == "null") {
      setWait(false)
      return
    }
    accounts.length >= 3 ? router.push("/account") : setWait(false)
  }, [])

  if (wait) return <Wait />
  if (page == 1) return <RegisterEmail />
  if (page == 2) return <RegisterOTP />
  if (page == 3) return <RegisterPassword />
  if (page == 4) return <RegisterAbout />
  if (page == 5) return <GooglePassword />
  if (page == 6) return <GoogleAbout />
}
