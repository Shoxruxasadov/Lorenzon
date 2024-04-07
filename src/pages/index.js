import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import axios from "axios";
import Aos from 'aos';

import Root from "../layouts/root";
import Wait from '../components/loading/wait';
import useLocalStorage from "../hooks/useLocalStorage";

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
  const [token, setToken] = useLocalStorage("token", "null")
  const [wait, setWait] = useState(true)
  const router = useRouter()

  useEffect(() => {
    Aos.init({duration: 500})
    if (token === "null") { setWait(false); return }
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/auth/${token.id}`, { password: token.password }
    ).then(({ data }) => {
      // return data[0].role == "admin" ? router.push('/admin') : router.push('/home')
      return router.push('/home')
    }).catch().finally(() => setWait(false))
  }, [])

  if (wait) return <Wait />
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