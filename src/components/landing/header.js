import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Link as Scroll } from "react-scroll"

export default function Header() {
  const lists = [
    { name: "Home", link: "hero", position: 0 },
    { name: "Blog", link: "blog", position: -150 },
    { name: "Service", link: "service", position: -130 },
    { name: "About Us", link: "about", position: -100 },
    { name: "Support", link: "footer", position: 0 },
  ]

  return (
    <header>
      <div className="container">
        <motion.div
          initial={{ width: "0", height: "0" }}
          animate={{ width: "70px", height: "70px" }}
          transition={{ duration: 1 }}
          className="ellipse"
        />
        <Link href={"/"} className="logo">
          <Image src="/lorenzon/logo.svg" width={170} height={40} alt="Lorenzon" />
        </Link>
        <nav className="navbar">
          <ul className="list">
            {lists.map((list, i) => (
              <li key={i}>
                <Scroll
                  activeClass="active"
                  to={list.link}
                  spy={true}
                  smooth={true}
                  offset={list.position}
                  duration={500}
                >
                  {list.name}
                </Scroll>
              </li>
            ))}
          </ul>
          <div className="download">
            <Link href={"/"}>Download Now</Link>
          </div>
        </nav>

        <div className="menu">
          <div
            onClick={() =>
              document.querySelector(".menu").classList.toggle("active")
            }
            className="toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
