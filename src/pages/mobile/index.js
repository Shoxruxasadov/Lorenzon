import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Root from "../../layouts/root";

export default function Mobile() {
    const router = useRouter()

    useEffect(()=>{
        const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(!isMobileDevice()) router.push('http://lorenzon.uz/')
    })

    return (
        <Root page="mobile" title="Coming Soon!">
            <div id="wrapper">
                <h1>Coming Soon!</h1>
                <div>
                    <h2>We are working on mobile version.</h2>
                </div>
            </div>
        </Root>
    )
}
