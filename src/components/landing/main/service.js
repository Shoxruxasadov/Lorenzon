import Image from "next/image";

export default function Service() {
    return (
        <section id="service">
            <div className="container">
                <div className="title" data-aos="zoom-out-up">
                    <div className="headtitle">
                        <h2>The best B2B - B2C opportunities</h2>
                    </div>
                    <div className="subtitle">
                        <p>There are many variations of passages of Lorem Ipsum available, but the <br /> majority have suffered alteration in some form, by injected humor</p>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/service/energy.webp" width={80} height={80} alt="energy" />
                        <h3>It&#39;s simply great</h3>
                        <p>The company itself is a very successful company. Who are the elders?</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/service/wifi.webp" width={80} height={80} alt="wifi" />
                        <h3>It is a long established</h3>
                        <p>The company itself is a very successful company. Who are the elders?</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/service/health.webp" width={80} height={80} alt="health" />
                        <h3>Contrary to pop belief</h3>
                        <p>The company itself is a very successful company. Who are the elders?</p>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="card" data-aos="zoom-out-right">
                        <Image src="/landing/service/dj.webp" width={640} height={400} alt="dj" />
                        <div className="content">
                            <div className="round">
                                <h3>At vero eos et accusamus et.</h3>
                                <p>But I must explain to you how all this mistaken idea of dencuncing pleasure and praising pain. But I must explain to you how all this.</p>
                                <p>But I must explain to you how all this mistaken idea of dencuncing pleasure and praising pain. But I must explain to you how all this mistaken idea.</p>
                            </div>
                        </div>
                    </div>
                    <div className="card" data-aos="zoom-out-left">
                        <Image src="/landing/service/party.webp" width={640} height={400} alt="party" />
                        <div className="content">
                            <div className="round">
                                <h3>At vero eos et accusamus et.</h3>
                                <p>But I must explain to you how all this mistaken idea of dencuncing pleasure and praising pain. But I must explain to you how all this.</p>
                                <p>But I must explain to you how all this mistaken idea of dencuncing pleasure and praising pain. But I must explain to you how all this mistaken idea.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
