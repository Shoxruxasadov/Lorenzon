import { createBrowserRouter } from "react-router-dom";
import "./styles/global.scss"

import Hero from "./router/Hero/Hero"
import Error from "./router/Error/Error"
import Home from "./router/Home/Home"
import Admin from "./router/Admin/Admin"
import Profile from "./router/Profile/Profile"
import Signin from "./router/Login/Signin"
import Signup from "./router/Login/Signup"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/profile",
    element: <Profile />,
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
