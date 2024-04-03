import Root from "../../layouts/root";

export default function Error() {
    return (
        <Root page="error" title="Not Found Page">
            <div id="wrapper">
                <h1>404</h1>
                <div>
                    <h2>This page could not be found.</h2>
                </div>
            </div>
        </Root>
    )
}
