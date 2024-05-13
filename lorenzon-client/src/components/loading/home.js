import Sidebar from "../../components/home/sidebar";
import Content from "../../components/home/content";
import Player from "../../components/home/player";
import Root from "../../layouts/root";
import MainHeader from "../home/header";

export default function Loading() {
    return (
        <Root page="home" title="Loading...">
            <Sidebar />
            <main id="home-loading">
                <MainHeader />
                <div className="waiting">
                    <span className="loader"></span>
                </div>
            </main>
            <Content />
            <Player />
        </Root>
    )
}
