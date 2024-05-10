import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useTheme } from "next-themes";

export default function Hero() {
  const [accounts, setAccounts] = useLocalStorage("accounts", "null");
  const { resolvedTheme } = useTheme()

  let regular
  switch (resolvedTheme) {
    case 'light':
      regular = '/landing/hero/regular.black.webp'
      break
    case 'dark':
      regular = '/landing/hero/regular.white.webp'
      break
    default:
      regular = '/landing/hero/regular.white.webp'
      break
  }

  let spotify
  switch (resolvedTheme) {
    case 'light':
      spotify = '/landing/hero/spotify.black.webp'
      break
    case 'dark':
      spotify = '/landing/hero/spotify.white.webp'
      break
    default:
      spotify = '/landing/hero/spotify.white.webp'
      break
  }

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
              <Link href={(accounts == "null" || accounts.length == 0) ? "/signup" : "/account"} className="signup">
                Sign Up
              </Link>
              <Link href={(accounts == "null" || accounts.length == 0) ? "/login" : "/account"} className="signin">
                Log In
              </Link>
            </div>
          </div>
          <motion.div className="webapp" initial={{ x: "9px", y: "32px", opacity: 0, scale: "1.1" }}
            animate={{ x: "-72px", y: "32px", opacity: 1, scale: "1.1" }}
            transition={{ duration: 2, type: "spring" }}>
            <Image
              src="/landing/hero/webapp.webp"
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
                <Image src={regular} alt="regular" width={80} height={30} />
                <Image src={spotify} alt="spotify" width={80} height={30} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
