import Image from "next/image";

export default function Team() {
    return (
        <section id="team">
            <div className="container">
                <div className="title">
                    <div className="headtitle" data-aos="zoom-out-down">
                        <h2>The team around the world</h2>
                    </div>
                    <div className="subtitle" data-aos="zoom-out-down">
                        <p>The standart chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested Sections 1.10.32.</p>
                    </div>
                </div>
                <Image src="/landing/team/world.webp" width={1280} height={400} className="world" alt="world" data-aos="zoom-out"/>
                <div className="wrapper">
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card" data-aos="zoom-out">
                        <Image src="/landing/team/tom.webp" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
