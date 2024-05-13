import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Banner({ src }) {
    const bannerRef = useRef(null)
    const [bannerHeight, setBannerHeight] = useState("173.9375px")
    const [bannerRadius, setBannerRadius] = useState("12.65px")
    const [loadedImage, setLoadedImage] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setBannerHeight(`${bannerRef.current.offsetWidth * 0.14844375}px`) // banner with (1012) / height 150.21875px = 0.14844375 / ( 2560х380px )
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
                height={380}
                placeholder="blur"
                blurDataURL="/other/unblur.webp"
                className={loadedImage ? 'unblur' : ''}
                onLoad={() => setLoadedImage(true)}
            />}
        </div>
    )
}