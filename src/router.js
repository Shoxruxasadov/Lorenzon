import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/global.scss";

// ALL PAGES
import Hero from "./router/Hero/Hero";
import Error from "./router/Error/Error";
import Home from "./router/Home/Home";
import Profile from "./router/Profile/Profile";
import Signin from "./router/Login/Signin";
import Signup from "./router/Login/Signup";
// ADMIN PAGES
import Admin from "./router/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard";
import Users from "./components/Admin/Users";
import Products from "./components/Admin/Products";

const RequireAuth = ({ children }) => {
  const confirm = useSelector((state) => state.confirmReducer.confirm);
  console.log(confirm);
  return confirm ? children : (window.location.pathname = "/login");
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Admin />
      </RequireAuth>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <RequireAuth>
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <RequireAuth>
            <Products />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);
