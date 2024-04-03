import Head from 'next/head'

export default function Root({ children, page, title }) {
    return (
        <>
            <Head>
                {title === "Lorenzon" ? <title>Lorenzon</title> : title == "Loading..." ? <title>Lorenzon • Loading...</title> : <title>Lorenzon • {title}</title>}
                <link href="/favicon.ico?" rel="icon" />
                <link href="/favicon.png?" rel="apple-touch-icon" />
                <link href="/manifest.json" rel="manifest" />
                <meta name="theme-color" content="#0A0D13" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="google-site-verification" content="E4VKDILHxyNIMCC_ESpZ2l7q_h_Dg-S90tpF_W8vjVg" />
                <meta name="description" content="Lorenzon • Enjoy the music and connect with people • Free Music Player" />
            </Head>
            <div id={page}>
                {children}
            </div>
        </>
    )
}
