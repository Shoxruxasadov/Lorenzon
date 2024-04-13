import useLocalStorage from '../hooks/useLocalStorage'
import HomeLayout from './home'
import Banner from './banner'
import { useState } from 'react';
import Image from 'next/image'

export default function UserLayout({ user }) {
    const [token, setToken] = useLocalStorage("token", "null")
    const [loadedImage, setLoadedImage] = useState(false);

    return (
        <HomeLayout page="home-user" title={user.name}>
            {(user.banner || user._id == token.id) && <Banner src={user.banner || "empty"} />}
            <div className={`profile ${(user.banner || user._id == token.id) ? "active" : ""}`}>
                <Image
                    src={user.image || "/other/unknown.user.webp"}
                    alt="user"
                    width={155}
                    height={155}
                    placeholder="blur"
                    blurDataURL="/other/unknown.user.blur.webp"
                    className={loadedImage ? 'user-image unblur' : 'user-image'}
                    onLoadingComplete={() => setLoadedImage(true)}
                />
                <style jsx global>{`
                    .unblur {
                      animation: unblur 0.3s linear;
                    }
                
                    @keyframes unblur {
                      from {
                        filter: blur(10px);
                      }
                      to {
                        filter: blur(0);
                      }
                    }
                `}</style>
                <div className="content">
                    <h1 className="name">{user.name}</h1>
                    <p className="username">
                        <span>@{user.username}</span>
                        {user.status === "premium" &&
                            <div className="verify">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.53359 0.416756C9.79923 0.179395 10.2008 0.179395 10.4664 0.416756L12.8406 2.53818C12.9588 2.64382 13.1094 2.7062 13.2677 2.7151L16.4466 2.89382C16.8023 2.91382 17.0862 3.19775 17.1062 3.55342L17.2849 6.7323C17.2938 6.8906 17.3562 7.04118 17.4618 7.15941L19.5832 9.53359C19.8206 9.79923 19.8206 10.2008 19.5832 10.4664L17.4618 12.8406C17.3562 12.9588 17.2938 13.1094 17.2849 13.2677L17.1062 16.4466C17.0862 16.8023 16.8023 17.0862 16.4466 17.1062L13.2677 17.2849C13.1094 17.2938 12.9588 17.3562 12.8406 17.4618L10.4664 19.5832C10.2008 19.8206 9.79923 19.8206 9.53359 19.5832L7.15941 17.4618C7.04118 17.3562 6.8906 17.2938 6.7323 17.2849L3.55342 17.1062C3.19775 17.0862 2.91382 16.8023 2.89382 16.4466L2.7151 13.2677C2.7062 13.1094 2.64382 12.9588 2.53818 12.8406L0.416756 10.4664C0.179395 10.2008 0.179395 9.79923 0.416756 9.53359L2.53818 7.15941C2.64382 7.04118 2.7062 6.8906 2.7151 6.7323L2.89382 3.55342C2.91382 3.19775 3.19775 2.91382 3.55342 2.89382L6.7323 2.7151C6.8906 2.7062 7.04118 2.64382 7.15941 2.53818L9.53359 0.416756Z" fill="#6940ee"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="7.5" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2.08334 5.41666L3.75001 7.08332L7.91668 2.91666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        }
                    </p>
                </div>
            </div>
            <div className='emptyScreen' />
        </HomeLayout>
    )
}
