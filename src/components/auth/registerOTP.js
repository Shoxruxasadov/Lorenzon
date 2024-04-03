import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { wrong, success, warning } from "../../utils/toastify";
import { useAuthCreate } from "../../store/zustand";
import Root from "../../layouts/root";

import { IoIosArrowBack } from "react-icons/io";

export default function RegisterOTP() {
    const setPage = useAuthCreate(state => state.setPage);
    const page = useAuthCreate(state => state.page);
    const email = useAuthCreate(state => state.email);
    const randomCode = useAuthCreate(state => state.randomCode);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(true);

    const auth = ({ code1, code2, code3, code4 }) => {
        if (`${code1}${code2}${code3}${code4}` == randomCode) {
            success("Your account has been verified")
            setPage(3)
        } else {
            wrong("The code you entered is incorrect")
            setLoading(true)
        }
    }

    useEffect(() => {
        const inputs = document.querySelectorAll("input")
        inputs.forEach((input, index1) => {
            input.addEventListener("keyup", (e) => {
                const currentInput = input
                const nextInput = input.nextElementSibling
                const prevInput = input.previousElementSibling
                if (currentInput.value.length > 1) {
                    currentInput.value = ""
                    return
                }
                if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                    nextInput.removeAttribute("disabled")
                    nextInput.focus()
                }
                if (inputs[3].value !== "") {
                    setLoading(false)
                } else {
                    setLoading(true)
                }
                if (e.key == "Backspace") {
                    inputs.forEach((input, index2) => {
                        if (index1 <= index2 && prevInput) {
                            input.setAttribute("disabled", true)
                            currentInput.value = ""
                            prevInput.focus()
                        }
                    })
                }
            });
        });
        inputs[0].focus()
    }, [])

    return (
        <Root page="register" title="Confirm your account">
            <motion.section
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="formes"
            >
                <Link href={"/"} className="logo">
                    <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
                </Link>
                <div className="wrapper OPT">
                    <div className="bar">
                        <div className={`line this${page - 1}`} />
                        <div className="back">
                            <IoIosArrowBack onClick={() => setPage(1)} />
                            <div className="step">
                                <p>Step {page - 1} of 3</p>
                                <p>Confirm your account</p>
                            </div>
                        </div>
                    </div>
                    <div className="scaling">
                        <h1 className="startOTP">Enter OTP Code</h1>
                        <p className="email">{email}</p>
                        <form onSubmit={handleSubmit(auth)}>
                            <div className="code">
                                <input
                                    {...register("code1", { required: true })}
                                    type="number"
                                />
                                <input
                                    {...register("code2", { required: true })}
                                    disabled={true}
                                    type="number"
                                />
                                <input
                                    {...register("code3", { required: true })}
                                    disabled={true}
                                    type="number"
                                />
                                <input
                                    {...register("code4", { required: true })}
                                    disabled={true}
                                    type="number"
                                />
                            </div>
                            <button disabled={loading} type="submit" >Verify</button>
                        </form>
                    </div>
                </div>
            </motion.section>
        </Root>
    )
}
