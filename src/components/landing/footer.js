import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="bar">
            <div className="module">
              <p>Company</p>
              <ul>
                <li>Service</li>
                <li>About</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="module">
              <p>Communities</p>
              <ul>
                <li>For Artists</li>
                <li>Developers</li>
                <li>Advertising</li>
              </ul>
            </div>
            <div className="module">
              <p>Help Center</p>
              <ul>
                <li>FAQ</li>
                <li>Support</li>
                <li>Online Chat</li>
              </ul>
            </div>
          </div>
          <div className="info">
            <Link href={"/"} className="logo">
              <Image src="/lorenzon/white.svg" width={136} height={32} alt="Lorenzon" />
            </Link>
            <div className="social">
              <a href="https://www.instagram.com/lorenzon.uz" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://www.facebook.com/profile.php?id=61556759417185" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://x.com/lorenzon_uz" target="_blank" rel="noreferrer"><FaXTwitter /></a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <div className="policy">
            <ul>
              <li>Legal</li>
              <li>Safety & Privacy Center</li>
              <li>Privacy Policy</li>
              <li>Cookies</li>
              <li>About Ads</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div className="copyright">
            <p><span className="brand">&copy; Lorenzon 2023-{new Date().getFullYear()} | </span><a href="https://shoxruxasadov.uz" target="_blank">Powered by</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
