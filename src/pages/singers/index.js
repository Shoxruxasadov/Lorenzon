import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import HomeLayout from "../../layouts/home";
import Banner from "../../layouts/banner";
import { useAnotherModels, useMusic } from "../../store/zustand";
import { useRouter } from "next/router";

export default function HomeSingers() {
  const YOUR_FAVORITE_SINGERS = useAnotherModels((state) => state.YOUR_FAVORITE_SINGERS);
  const SET_YOUR_FAVORITE_SINGERS = useAnotherModels((state) => state.SET_YOUR_FAVORITE_SINGERS);
  const [columnCount, setColumnCount] = useState(6);
  const [loadedImage, setLoadedImage] = useState(false)
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/singers/get`).then(({ data }) => SET_YOUR_FAVORITE_SINGERS(data))

    const handleResize = () => {
      if (window.innerWidth >= 2330) setColumnCount(10);
      if (window.innerWidth >= 2130 && window.innerWidth < 2330) setColumnCount(9);
      if (window.innerWidth >= 1930 && window.innerWidth < 2130) setColumnCount(8);
      if (window.innerWidth >= 1730 && window.innerWidth < 1930) setColumnCount(7);
      if (window.innerWidth >= 1560 && window.innerWidth < 1730) setColumnCount(6);
      if (window.innerWidth >= 1400 && window.innerWidth < 1560) setColumnCount(5);
      if (window.innerWidth >= 1230 && window.innerWidth < 1400) setColumnCount(4);
      if (window.innerWidth >= 1024 && window.innerWidth < 1230) setColumnCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HomeLayout page="home-library" title="Favorite singers">
      <Banner src={"/other/space.ads.webp"} />
      <article>
        <header>
          <h2>Favorite singers</h2>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }} >
          {YOUR_FAVORITE_SINGERS.map((item, index) => (
            <div className='card' key={index} onClick={() => router.push(`/@${item.username}`)} >
              <div className="images">
                <Image
                  src={item.image || "/other/unknown.user.webp"}
                  alt="image"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/other/unknown.user.blur.webp"
                  className={`image ${loadedImage ? 'unblur' : ''}`}
                  onLoadingComplete={() => setLoadedImage(true)}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="title">
                <h2>{item.name}</h2>
                <p>Singer</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </HomeLayout>
  )
}