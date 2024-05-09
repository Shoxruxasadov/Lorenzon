import Root from "../../layouts/root";

export default function Wait() {
    return (
        <Root page="wait" title={(window && window.location.pathname == '/') ? 'Enjoy the music • Music streaming service' :'Loading...'}>
            <span className="loader"></span>
        </Root>
    )
}