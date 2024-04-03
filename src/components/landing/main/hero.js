import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function Hero() {
  const [accounts, setAccounts] = useLocalStorage("accounts", "null");

  return (
    <section id="hero">
      <div className="container">
        <motion.div
          className="content"
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <div className="title">
            <div className="headline">
              <h1>Enjoy the music and connect with people.</h1>
            </div>
            <div className="subtitle">
              <p>Making music accessible for all. Join the largest music events ever made by humanity. Download the app and we do the rest.</p>
            </div>
            <div className="login">
              <Link href={(accounts == "null" || accounts.length == 0) ? "/register" : "/account"} className="signup">
                Sign Up
              </Link>
              <Link href={(accounts == "null" || accounts.length == 0) ? "/login" : "/account"} className="signin">
                Sign In
              </Link>
            </div>
          </div>
          <motion.div className="webapp" initial={{ x: "9px", y: "32px", opacity: 0, scale: "1.1" }}
            animate={{ x: "-72px", y: "32px", opacity: 1, scale: "1.1" }}
            transition={{ duration: 2, type: "spring" }}>
            <Image
              src="/landing/hero/webapp.png"
              alt="WebApp"
              width={350}
              height={505}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="collaboration"
          initial={{ x: "-2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <div className="wrapper">
            <div className="line" />
            <div className="content-brand">
              <div className="title-brand">
                <p>Collaboration Partners</p>
              </div>
              <div className="brands">
                <Image src="/landing/hero/regular.png" alt="regular" width={80} height={30} />
                <Image src="/landing/hero/spotify.png" alt="spotify" width={80} height={30} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
