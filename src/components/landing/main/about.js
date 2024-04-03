import Image from "next/image";

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <div className="title">
                    <div className="headtitle">
                        <h2>Experiences</h2>
                    </div>
                    <div className="subtitle">
                        <p>Sed do eiusmod tempor incididunt ut labore accusantium dolorem typesetting industry.</p>
                    </div>
                    <div className="subtitle">
                        <p>Sed do eiusmod tempor incididunt ut labore accusantium dolorem typesetting industry.</p>
                    </div>
                </div>
                <div className="image">
                    <Image src="/landing/hero/background.png" width={1000} height={600} className="about" alt="background" />
                </div>
                <div className="wrapper">
                    <div className="top">
                        <h3>This is us</h3>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in.</p>
                    </div>
                    <div className="round">
                        <div className="card">
                            <h3>Values</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the.</p>
                        </div>
                        <div className="card">
                            <h3>Tecnology</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the.</p>
                        </div>
                        <div className="card">
                            <h3>People</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the.</p>
                        </div>
                        <div className="card">
                            <h3>Diversity</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
