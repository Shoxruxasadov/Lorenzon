import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Aos from "aos"

import { useStore } from "../store/zustand";
import Root from "../layouts/root";

import Header from "../components/landing/header";
import Footer from "../components/landing/footer";
import Hero from '../components/landing/main/hero';
import Blog from '../components/landing/main/blog';
import Passages from '../components/landing/main/passages';
import Service from '../components/landing/main/service';
import Tempor from '../components/landing/main/tempor';
import About from '../components/landing/main/about';
import Team from '../components/landing/main/team';
import Started from '../components/landing/main/started';

export default function Landing() {
  const user = useStore(state => state.user);
  const router = useRouter()

  useEffect(() => {
    Aos.init({ duration: 500 })
    if (user._id) router.push('/home')
  })

  return (
    <Root page="landing" title="Enjoy the music • Music streaming service">
      <Header />
      <main>
        <Hero />
        <hr className='line' />
        <Blog />
        <Passages />
        <hr className='line' />
        <Service />
        <Tempor />
        <hr className='line' />
        <About />
        <Team />
        <Started />
        <hr className='line' />
      </main>
      <Footer />
    </Root>
  );
}