import Image from "next/image";

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <div className="title">
                    <div className="headtitle" data-aos="zoom-out-down">
                        <h2>Experiences</h2>
                    </div>
                    <div className="subtitle" data-aos="zoom-out-down">
                        <p>Sed do eiusmod tempor incididunt ut labore accusantium dolorem typesetting industry.</p>
                    </div>
                    <div className="subtitle" data-aos="zoom-out-down">
                        <p>Sed do eiusmod tempor incididunt ut labore accusantium dolorem typesetting industry.</p>
                    </div>
                </div>
                <div className="image" data-aos="zoom-out-down">
                    <Image src="/landing/about/background.webp" width={1000} height={600} className="about" alt="background" />
                </div>
                <div className="wrapper">
                    <div className="top" data-aos="zoom-out-down">
                        <h3>This is us</h3>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in</p>
                    </div>
                    <div className="round">
                        <div className="card" data-aos="zoom-out">
                            <h3>Values</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Very well it has been the.</p>
                        </div>
                        <div className="card" data-aos="zoom-out">
                            <h3>Technology</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Very well it has been the.</p>
                        </div>
                        <div className="card" data-aos="zoom-out">
                            <h3>People</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Very well it has been the.</p>
                        </div>
                        <div className="card" data-aos="zoom-out">
                            <h3>Diversity</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Very well it has been the.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
