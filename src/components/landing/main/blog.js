import Image from "next/image";
import { Link as Scroll } from "react-scroll"

export default function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <div className="title">
          <div className="headtitle">
            <h2>Lorem Ipsum is simply dummy text of the printing and typeset.</h2>
          </div>
          <div className="subtitle">
            <p>There are many variations of passages of Loren Ipsum</p>
          </div>

          <div className="learn">
            <Scroll
              activeClass="active"
              to="passages"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              Learn More
            </Scroll>
          </div>
        </div>
        <div className="many">
          <div className="empty" />
          <div className="image" >
            <div className="blur" />
            <Image
              src="/landing/blog/phone.webp"
              alt="WebApp"
              width={520}
              height={350}
            />
            <div className="shadow" />
          </div>
          <p>There are many variations of passages of Loren Ipsum</p>
        </div>
      </div>
    </section>
  )
}
