import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthCreate } from "../../store/zustand";
import useLocalStorage from "../../hooks/useLocalStorage";
import Wait from "../../components/loading/wait";

import SignUpEmail from "../../components/auth/signupEmail";
import SignUpOTP from "../../components/auth/signupOTP";
import SignUpPassword from "../../components/auth/signupPassword";
import SignUpAbout from "../../components/auth/signupAbout";
import GooglePassword from "../../components/auth/googlePassword";
import GoogleAbout from "../../components/auth/googleAbout";

export default function SignUp() {
  const page = useAuthCreate(state => state.page);
  const [accounts, setAccounts] = useLocalStorage("accounts", "null");
  const router = useRouter()

  useEffect(() => {
    if (accounts != "null" && accounts.length >= 3) router.push("/account")
  }, [])

  if (page == 1) return <SignUpEmail />
  if (page == 2) return <SignUpOTP />
  if (page == 3) return <SignUpPassword />
  if (page == 4) return <SignUpAbout />
  if (page == 5) return <GooglePassword />
  if (page == 6) return <GoogleAbout />
}
