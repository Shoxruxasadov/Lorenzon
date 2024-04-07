import Image from "next/image";

export default function Started() {
    return (
        <section id="started">
            <div className="container" data-aos="zoom-out-up">
                <div className="wrapper">
                    <div className="shadow" />
                    <div className="shadow" />
                    <div className="title">
                        <div className="headtitle">
                            <h2>Get started now, no regrets</h2>
                        </div>
                        <div className="subtitle">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text it has.</p>
                        </div>
                    </div>
                    <div className="downloads">
                        <Image src="/landing/started/apple.svg" width={260} height={100} alt="Apple" />
                        <Image src="/landing/started/google.svg" width={260} height={100} alt="Google" />
                    </div>
                    <div className="image">
                        <Image src="/landing/started/play.svg" width={60} height={60} alt="play" className="play" />
                        <Image src="/landing/started/disco.webp" width={1200} height={400} alt="background" className="background" />
                    </div>
                </div>
            </div>
        </section>
    )
}
