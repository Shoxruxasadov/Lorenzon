import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Banner({ src }) {
    const bannerRef = useRef(null)
    const [bannerHeight, setBannerHeight] = useState("173.9375px")
    const [bannerRadius, setBannerRadius] = useState("12.65px")
    const [loadedImage, setLoadedImage] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setBannerHeight(`${bannerRef.current.offsetWidth * 0.171875}px`)
            if (bannerRef.current.offsetWidth > 650) setBannerRadius(`${bannerRef.current.offsetWidth * 0.0125}px`)
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div id="banner" ref={bannerRef} style={{ height: bannerHeight, borderRadius: bannerRadius }}>
            {src != "empty" && <Image
                src={src}
                alt="banner"
                width={2560}
                height={440}
                placeholder="blur"
                blurDataURL="/other/unblur.webp"
                className={loadedImage ? 'unblur' : ''}
                onLoadingComplete={() => setLoadedImage(true)}
            />}
            <style jsx global>{`
               .unblur {
                 animation: unblur 0.3s linear;
               }
              
               @keyframes unblur {
                 from {
                   filter: blur(20px);
                 }
                 to {
                   filter: blur(0);
                 }
               }
            `}</style>
        </div>
    )
}