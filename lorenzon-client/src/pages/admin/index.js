import AdminLayout from "../../layouts/admin";

export default function AdminMain() {
  return (
    <AdminLayout page="admin-main" title="Dashboard">
      <header>
        <div className="category">
          <h1>Dashboard</h1>
        </div>
      </header>
      <div className="content">
        <div className="top">
          <div className="customer first-piece part"></div>
          <div className="today last-piece part"></div>
        </div>
        <div className="mid">
          <div className="report first-piece part"></div>
          <div className="last-piece col">
            <div className="latest part"></div>
            <div className="profit part"></div>
          </div>
        </div>
        <div className="down">
          <div className="first-piece row">
            <div className="order part"></div>
            <div className="item part"></div>
          </div>
          <div className="visit last-piece part"></div>
        </div>
      </div>
    </AdminLayout>
  );
}
