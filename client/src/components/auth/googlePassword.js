import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { success, warning } from "../../utils/toastify";
import { useAuthCreate } from "../../store/zustand";
import Root from "../../layouts/root";

import { FaEye, FaEyeSlash } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io";
import { MdPassword } from "react-icons/md";

export default function SignUpGooglePassword() {
    const setPage = useAuthCreate(state => state.setPage);
    const page = useAuthCreate(state => state.page);
    const setPassword = useAuthCreate(state => state.setPassword);
    const password = useAuthCreate(state => state.password);
    const { register, handleSubmit } = useForm();
    const [eye, setEye] = useState(false);
    const [letter, setLetter] = useState(false);
    const [number, setNumber] = useState(false);
    const [character, setCharacter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState(password || "");

    const auth = ({ password }) => {
        if (!letter || !number || !character) {warning("Your password must contain at least"); return}
        success("Your password has been accepted")
        setPassword(password)
        setPage(6)
    }

    function leastPassword(value) {
            const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "?", "!", "&"]
            const isNumber = numbers.map(item => value.split("").find(findItem => item == findItem)).filter(item => item != undefined)[0]
            const alfa = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
            const isAlfa = alfa.map(item => value.toLowerCase().split("").find(findItem => item == findItem)).filter(item => item != undefined)[0]
            if (isNumber) setNumber(true)
            else setNumber(false)
            if (isAlfa) setLetter(true)
            else setLetter(false)
            if (value.length > 7) setCharacter(true)
            else setCharacter(false)
    }

    useEffect(() => {
        if (letter && number && character) setLoading(false)
        else setLoading(true)
    }, [letter, number, character])

    useEffect(() => {
        const input = document.querySelector("input").focus()
        password && leastPassword(password)
    }, [])

    return (
        <Root page="signup" title="Create a password">
            <motion.section
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="formes"
            >
                <Link href={"/"} className="logo">
                    <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
                </Link>
                <div className="wrapper regpas">
                    <div className="bar">
                        <div className={`line this5`} />
                        <div className="back">
                            <IoIosArrowBack onClick={() => setPage(1)} />
                            <div className="step">
                                <p>Step {page - 4} of 2</p>
                                <p>Create a password</p>
                            </div>
                        </div>
                    </div>
                    <p className="titleInput">Password</p>
                    <form onSubmit={handleSubmit(auth)} className="regpass">
                        <label className="password pass" htmlFor="password">
                            <MdPassword />
                            <input
                                {...register("password", { required: true })}
                                id="password"
                                type={eye ? "text" : "password"}
                                placeholder={eye ? "Enter Password" : "\u2217\u2217\u2217\u2217\u2217\u2217\u2217\u2217"}
                                className={eye ? "" : "lock"}
                                onKeyUp={({ target }) => leastPassword(target.value)}
                                onChange={({ target }) => setInput(target.value)}
                                value={input}
                                onKeyDown={(e)=> e.key == "Enter" && auth({password: e.target.value})}
                            />
                            {eye ? (
                                <FaEye className="eye" onClick={() => setEye(false)} />
                            ) : (
                                <FaEyeSlash className="eye" onClick={() => setEye(true)} />
                            )}
                        </label>
                        <p className="least">Your password must contain at least</p>
                        <ul>
                            <li>
                                {letter ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 16C9.09428 16 10.1246 15.7902 11.0911 15.3707C12.0575 14.9564 12.9064 14.3808 13.6376 13.6441C14.3739 12.9074 14.9517 12.0582 15.371 11.0964C15.7903 10.1295 16 9.09608 16 7.99616C16 6.90136 15.7903 5.87306 15.371 4.91127C14.9517 3.94436 14.3739 3.09257 13.6376 2.35588C12.9064 1.61918 12.055 1.04364 11.0834 0.62926C10.117 0.209752 9.08661 0 7.99233 0C6.89805 0 5.86769 0.209752 4.90125 0.62926C3.9348 1.04364 3.08341 1.61918 2.34708 2.35588C1.61585 3.09257 1.04059 3.94436 0.621285 4.91127C0.207095 5.87306 0 6.90136 0 7.99616C0 9.09608 0.207095 10.1295 0.621285 11.0964C1.04059 12.0582 1.61841 12.9074 2.35475 13.6441C3.09108 14.3808 3.94247 14.9564 4.90892 15.3707C5.87536 15.7902 6.90572 16 8 16ZM7.14861 11.8024C6.99009 11.8024 6.84692 11.7691 6.71908 11.7026C6.59124 11.631 6.47108 11.5236 6.35858 11.3803L4.51007 9.15492C4.43848 9.05771 4.38223 8.96307 4.34132 8.87098C4.30553 8.77378 4.28763 8.67402 4.28763 8.5717C4.28763 8.35683 4.36178 8.17522 4.51007 8.02686C4.65836 7.87338 4.83989 7.79664 5.05465 7.79664C5.18249 7.79664 5.29754 7.82478 5.39981 7.88105C5.50208 7.93221 5.60435 8.02174 5.70662 8.14964L7.1256 9.93L10.2167 4.98801C10.4008 4.6964 10.6283 4.5506 10.8993 4.5506C11.1039 4.5506 11.2854 4.61711 11.4439 4.75012C11.6075 4.88313 11.6894 5.05707 11.6894 5.27194C11.6894 5.36914 11.6689 5.46635 11.628 5.56355C11.5922 5.66075 11.5462 5.75284 11.4899 5.83981L7.90796 11.3803C7.81592 11.5133 7.70342 11.6182 7.57047 11.695C7.44263 11.7666 7.30201 11.8024 7.14861 11.8024Z" fill="#582DDD" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="#99999F" strokeWidth="1.5" />
                                </svg>}
                                <span>1 letter</span>
                            </li>
                            <li>
                                {number ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 16C9.09428 16 10.1246 15.7902 11.0911 15.3707C12.0575 14.9564 12.9064 14.3808 13.6376 13.6441C14.3739 12.9074 14.9517 12.0582 15.371 11.0964C15.7903 10.1295 16 9.09608 16 7.99616C16 6.90136 15.7903 5.87306 15.371 4.91127C14.9517 3.94436 14.3739 3.09257 13.6376 2.35588C12.9064 1.61918 12.055 1.04364 11.0834 0.62926C10.117 0.209752 9.08661 0 7.99233 0C6.89805 0 5.86769 0.209752 4.90125 0.62926C3.9348 1.04364 3.08341 1.61918 2.34708 2.35588C1.61585 3.09257 1.04059 3.94436 0.621285 4.91127C0.207095 5.87306 0 6.90136 0 7.99616C0 9.09608 0.207095 10.1295 0.621285 11.0964C1.04059 12.0582 1.61841 12.9074 2.35475 13.6441C3.09108 14.3808 3.94247 14.9564 4.90892 15.3707C5.87536 15.7902 6.90572 16 8 16ZM7.14861 11.8024C6.99009 11.8024 6.84692 11.7691 6.71908 11.7026C6.59124 11.631 6.47108 11.5236 6.35858 11.3803L4.51007 9.15492C4.43848 9.05771 4.38223 8.96307 4.34132 8.87098C4.30553 8.77378 4.28763 8.67402 4.28763 8.5717C4.28763 8.35683 4.36178 8.17522 4.51007 8.02686C4.65836 7.87338 4.83989 7.79664 5.05465 7.79664C5.18249 7.79664 5.29754 7.82478 5.39981 7.88105C5.50208 7.93221 5.60435 8.02174 5.70662 8.14964L7.1256 9.93L10.2167 4.98801C10.4008 4.6964 10.6283 4.5506 10.8993 4.5506C11.1039 4.5506 11.2854 4.61711 11.4439 4.75012C11.6075 4.88313 11.6894 5.05707 11.6894 5.27194C11.6894 5.36914 11.6689 5.46635 11.628 5.56355C11.5922 5.66075 11.5462 5.75284 11.4899 5.83981L7.90796 11.3803C7.81592 11.5133 7.70342 11.6182 7.57047 11.695C7.44263 11.7666 7.30201 11.8024 7.14861 11.8024Z" fill="#582DDD" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="#99999F" strokeWidth="1.5" />
                                </svg>}
                                <span>1 number or special character (# ? ! &)</span>
                            </li>
                            <li>
                                {character ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 16C9.09428 16 10.1246 15.7902 11.0911 15.3707C12.0575 14.9564 12.9064 14.3808 13.6376 13.6441C14.3739 12.9074 14.9517 12.0582 15.371 11.0964C15.7903 10.1295 16 9.09608 16 7.99616C16 6.90136 15.7903 5.87306 15.371 4.91127C14.9517 3.94436 14.3739 3.09257 13.6376 2.35588C12.9064 1.61918 12.055 1.04364 11.0834 0.62926C10.117 0.209752 9.08661 0 7.99233 0C6.89805 0 5.86769 0.209752 4.90125 0.62926C3.9348 1.04364 3.08341 1.61918 2.34708 2.35588C1.61585 3.09257 1.04059 3.94436 0.621285 4.91127C0.207095 5.87306 0 6.90136 0 7.99616C0 9.09608 0.207095 10.1295 0.621285 11.0964C1.04059 12.0582 1.61841 12.9074 2.35475 13.6441C3.09108 14.3808 3.94247 14.9564 4.90892 15.3707C5.87536 15.7902 6.90572 16 8 16ZM7.14861 11.8024C6.99009 11.8024 6.84692 11.7691 6.71908 11.7026C6.59124 11.631 6.47108 11.5236 6.35858 11.3803L4.51007 9.15492C4.43848 9.05771 4.38223 8.96307 4.34132 8.87098C4.30553 8.77378 4.28763 8.67402 4.28763 8.5717C4.28763 8.35683 4.36178 8.17522 4.51007 8.02686C4.65836 7.87338 4.83989 7.79664 5.05465 7.79664C5.18249 7.79664 5.29754 7.82478 5.39981 7.88105C5.50208 7.93221 5.60435 8.02174 5.70662 8.14964L7.1256 9.93L10.2167 4.98801C10.4008 4.6964 10.6283 4.5506 10.8993 4.5506C11.1039 4.5506 11.2854 4.61711 11.4439 4.75012C11.6075 4.88313 11.6894 5.05707 11.6894 5.27194C11.6894 5.36914 11.6689 5.46635 11.628 5.56355C11.5922 5.66075 11.5462 5.75284 11.4899 5.83981L7.90796 11.3803C7.81592 11.5133 7.70342 11.6182 7.57047 11.695C7.44263 11.7666 7.30201 11.8024 7.14861 11.8024Z" fill="#582DDD" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="#99999F" strokeWidth="1.5" />
                                </svg>}
                                <span>8 characters</span>
                            </li>
                        </ul>
                        <button disabled={loading} type="submit">Next</button>
                    </form>
                </div>
            </motion.section>
        </Root>
    )
}
