import Sidebar from "../../components/admin/sidebar";
import Root from "../../layouts/root";

export default function Loading() {
    return (
        <Root page="admin" title="Loading...">
            <Sidebar />
            <main id="admin-loading"><span className="loader"></span></main>
        </Root>
    )
}
