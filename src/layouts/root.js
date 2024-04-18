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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="google-site-verification" content="E4VKDILHxyNIMCC_ESpZ2l7q_h_Dg-S90tpF_W8vjVg" />
                <meta name="description" content="Lorenzon • Enjoy the music and connect with people • Free Music Player" />
                <meta name="keywords" content="Lorenzon, Lorenzonuz, Lorenzon uz, Lorenzon bot, Lorenzo, lorenzon, Music, Player, Free, Spotify, Spotify clone, Streaming, Stream, Streaming Music Player, Music Player, Song, Songs, Song player, Sound, Sound player, SoundCloud, SoundCloud clone" />
            </Head>
            <div id={page} onContextMenu={()=>{return}}>
                {children}
            </div>
        </>
    )
}
