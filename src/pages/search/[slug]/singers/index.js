import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import HomeLayout from "../../../../layouts/home";
import Banner from "../../../../layouts/banner";
import Loading from "../../../../components/loading/home";

export default function HomeSearchSingers() {
  const [isLoading, setLoading] = useState(true)
  const [singers, setSingers] = useState([])
  const [columnCount, setColumnCount] = useState(6);
  const [loadedImage, setLoadedImage] = useState(false)
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    pathname && axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/search/singers/${pathname.split('/')[2]}`).then(({ data }) => setSingers(data)).finally(() => setLoading(false))

    const handleResize = () => {
      if (window.innerWidth >= 2330) {
        setColumnCount(10);
      }
      if (window.innerWidth >= 2130 && window.innerWidth < 2330) {
        setColumnCount(9);
      }
      if (window.innerWidth >= 1930 && window.innerWidth < 2130) {
        setColumnCount(8);
      }
      if (window.innerWidth >= 1730 && window.innerWidth < 1930) {
        setColumnCount(7);
      }
      if (window.innerWidth >= 1560 && window.innerWidth < 1730) {
        setColumnCount(6);
      }
      if (window.innerWidth >= 1400 && window.innerWidth < 1560) {
        setColumnCount(5);
      }
      if (window.innerWidth >= 1230 && window.innerWidth < 1400) {
        setColumnCount(4);
      }
      if (window.innerWidth >= 1024 && window.innerWidth < 1230) {
        setColumnCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  if (isLoading) return <Loading />
  return (
    <HomeLayout page="home-library" title="Searched Singers">
      <Banner src={"/other/space.ads.webp"} />
      <article>
        <header>
          <h2>Searched Singers</h2>
        </header>
        <div className="content" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }} >
          {singers.map((item, index) => (
            <div className='card' key={index} onClick={() => router.push(`/@${item.username}`)} >
              <div className="images">
                <Image
                  src={item.image || "/other/unknown.music.webp"}
                  alt="image"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/other/unknown.music.blur.webp"
                  className={`image ${loadedImage ? 'unblur' : ''}`}
                  onLoadingComplete={() => setLoadedImage(true)}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="title">
                <h3>{item.name}</h3>
                <p>Singer</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </HomeLayout>
  )
}