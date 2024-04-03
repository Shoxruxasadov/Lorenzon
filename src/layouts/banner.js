import { useEffect, useRef, useState } from "react";

export default function Banner({ src }) {
    const bannerRef = useRef(null)
    const [bannerHeight, setBannerHeight] = useState("173.9375px")
    const [bannerRadius, setBannerRadius] = useState("12.65px")

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
            {src != "empty" && <img src={src} alt="banner" />}
        </div>
    )
}