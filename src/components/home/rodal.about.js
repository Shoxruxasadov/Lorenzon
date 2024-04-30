import Rodal from "rodal"
import { useStore } from "../../store/zustand";
import { useRouter } from "next/navigation";

import { SiYoutube, SiFacebook, SiTelegram, SiSpotify } from "react-icons/si";
import { PiInstagramLogoFill } from "react-icons/pi";
import { HiAtSymbol, HiLink } from "react-icons/hi"
import { IoEarth } from "react-icons/io5";

export default function RodalAbout() {
    const about = useStore(state => state.about);
    const isOpenAbout = useStore(state => state.isOpenAbout);
    const setOpenAbout = useStore(state => state.setOpenAbout);
    const socials = about.socials ? [about.socials.youtube, about.socials.instagram, about.socials.facebook, about.socials.telegram, about.socials.spotify] : [];
    const checkLinks = socials.map(m => m != null && true).filter(m => m != undefined)[0]
    const router = useRouter()

    return (
        <Rodal className="rodal-about" visible={isOpenAbout} onClose={() => setOpenAbout(false)}>
            <h3 className="about-title">About</h3>
            <div className="scroll">
                {about.description && <h2 className="description">{about.description}</h2>}
                {(about.website || (about.socials && checkLinks)) && <div className="links">
                    <h3 className="title-links">{checkLinks ? 'Links' : 'Link'}</h3>
                    <ul>
                        {about.website && <li onClick={() => router.push(about.website)}>
                            <HiLink />
                            <div className="title">
                                <p>Website</p>
                                <span>{about.website.substring(8)}</span>
                            </div>
                        </li>}
                        {about.socials.youtube && <li onClick={() => router.push(about.socials.youtube)}>
                            <SiYoutube />
                            <div className="title">
                                <p>YouTube</p>
                                <span>{`${about.socials.youtube.split('/')[2]}/${about.socials.youtube.split('/')[3]}`}</span>
                            </div>
                        </li>}
                        {about.socials.instagram && <li onClick={() => router.push(about.socials.instagram)}>
                            <PiInstagramLogoFill />
                            <div className="title">
                                <p>Instagram</p>
                                <span>{`${about.socials.instagram.split('/')[2]}/${about.socials.instagram.split('/')[3]}`}</span>
                            </div>
                        </li>}
                        {about.socials.facebook && <li onClick={() => router.push(about.socials.facebook)}>
                            <SiFacebook />
                            <div className="title">
                                <p>Facebook</p>
                                <span>{`${about.socials.facebook.split('/')[2]}/${about.socials.facebook.split('/')[3]}`}</span>
                            </div>
                        </li>}
                        {about.socials.telegram && <li onClick={() => router.push(about.socials.telegram)}>
                            <SiTelegram />
                            <div className="title">
                                <p>Telegram</p>
                                <span>{`${about.socials.telegram.split('/')[2]}/${about.socials.telegram.split('/')[3]}`}</span>
                            </div>
                        </li>}
                        {about.socials.spotify && <li onClick={() => router.push(about.socials.spotify)}>
                            <SiSpotify />
                            <div className="title">
                                <p>Spotify</p>
                                <span>{`${about.socials.spotify.split('/')[2]}/${about.socials.spotify.split('/')[3]}/${about.socials.spotify.split('/')[4]}`}</span>
                            </div>
                        </li>}
                    </ul>
                </div>}

                <div className="details">
                    <h3 className="title-details">Profile Details</h3>
                    <ul>
                        <li className="my-link" onClick={() => router.push(`https://lorenzon.uz/@${about.username}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 214 210" fill="none" className="lorenzon">
                                <rect x="4.25846" width="34" height="44" rx="17" transform="matrix(0.709744 -0.70446 0.709744 0.70446 1.23605 177.178)" stroke='var(--text-color)' strokeWidth="14" />
                                <rect x="4.25843" y="0.0167919" width="34" height="144" rx="17" transform="matrix(0.712516 -0.701656 0.70696 0.707253 3.21236 105.059)" stroke='var(--text-color)' strokeWidth="14" />
                                <rect x="4.25843" y="-0.0159107" width="34" height="249.561" rx="17" transform="matrix(0.707107 -0.707107 0.712371 0.701803 4.00861 32.1981)" stroke='var(--text-color)' strokeWidth="14" />
                                <path d="M195.837 40.2127L195.864 40.1856L195.889 40.1579C199.472 36.2773 201.463 31.7779 201.475 27.0983C201.488 22.41 199.514 17.9143 195.863 14.06C192.17 10.1607 187.583 8.01361 182.821 8.00006C178.068 7.98655 173.499 10.0996 169.839 14.041L131.744 52.0406L131.7 52.0842L131.658 52.1296C124.146 60.266 124.078 72.5802 131.671 80.7008L131.689 80.7202L131.708 80.7393L169.56 119.808C173.176 123.667 177.512 125.862 182.116 125.862C186.728 125.862 191.071 123.659 194.691 119.788C198.285 115.945 200.29 111.547 200.29 106.931C200.29 102.332 198.3 97.9493 194.731 94.1165L171.771 67.6245C171.092 66.8402 171.125 65.6662 171.848 64.9215L195.837 40.2127Z" stroke='var(--text-color)' strokeWidth="14" />
                            </svg>
                            <span>{`www.lorenzon.uz/@${about.username}`}</span>
                        </li>
                        <li onClick={() => router.push(`https://lorenzon.uz/@${about.username}`)}>
                            <IoEarth />
                            <span className="country">{about.country}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Rodal>
    )
}