import Root from "../../layouts/root";

export default function Wait() {
    return (
        <Root page="wait" title="Loading...">
            <span className="loader"></span>
        </Root>
    )
}