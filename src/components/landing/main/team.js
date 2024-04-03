import Image from "next/image";

export default function Team() {
    return (
        <section id="team">
            <div className="container">
                <div className="title">
                    <div className="headtitle">
                        <h2>The team around the world</h2>
                    </div>
                    <div className="subtitle">
                        <p>The standart chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested Sections 1.10.32.</p>
                    </div>
                </div>
                <Image src="/landing/about/world.png" width={1280} height={400} className="world" alt="world"/>
                <div className="wrapper">
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                    <div className="card">
                        <Image src="/landing/team/tom.png" width={100} height={100} alt="team-user" />
                        <h4>Tom Hiddleston</h4>
                        <p>Producer</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
