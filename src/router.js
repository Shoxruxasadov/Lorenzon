import { createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/global.scss";

// ALL PAGES
import Hero from "./router/Hero/Hero";
import Error from "./router/Error/Error";
import Setting from "./router/Setting/Setting";
import Signin from "./router/Login/Signin";
import Signup from "./router/Login/Signup";
// ADMIN PAGES
import Admin from "./router/Admin/Admin";
import Dashboard from "./components/Admin/Home/Dashboard";
import Users from "./components/Admin/Users/Users";
import AddUser from "./components/Admin/Users/AddUser";
import Musics from "./components/Admin/Music/Musics/Music";
import Singers from "./components/Admin/Music/Singers/Singer";
import Playlist from "./components/Admin/Music/Playlists/Playlist";
import Album from "./components/Admin/Music/Albums/Album";
import AddMusic from "./components/Admin/Music/Musics/AddMusic";
// HOME PAGES
import Home from "./router/Home/Home";
import HomeMain from "./components/Home/Main/HomeMain";
import HomeSearch from "./components/Home/Main/HomeSearch";



const Auth = ({ children }) => {
  const confirm = useSelector((state) => state.confirmReducer.confirm);
  return confirm ? children : (window.location.pathname = "/login");
};

const NoAuth = ({ children }) => {
  const confirm = useSelector((state) => state.confirmReducer.confirm);
  const user = useSelector((state) => state.confirmReducer.user);
  return confirm && user
    ? (window.location.pathname = user.role === "Admin" ? "/admin" : "/home")
    : children;
};

const ConfirmAdmin = ({ children }) => {
  const confirm = useSelector((state) => state.confirmReducer.user);
  return confirm && confirm.role === "Admin"
    ? children
    : (window.location.pathname = "/home");
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NoAuth>
        <Hero />
      </NoAuth>
    ),
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      {
        path: "/home",
        element: (
          <Auth>
            <HomeMain />
          </Auth>
        ),
      },
    ],
  },
  {
    path: "/search",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      {
        path: "/search",
        element: (
          <Auth>
            <HomeSearch />
          </Auth>
        ),
      },
    ],
  },
  {
    path: "/discover",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/radio",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/albums",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/podcast",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/recently",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/favorite",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/localfiles",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
  },
  {
    path: "/admin",
    element: (
      <ConfirmAdmin>
        <Admin />
      </ConfirmAdmin>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <ConfirmAdmin>
            <Dashboard />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ConfirmAdmin>
            <Users />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/users/add-user",
        element: (
          <ConfirmAdmin>
            <AddUser />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics",
        element: (
          <ConfirmAdmin>
            <Musics />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/add-music",
        element: (
          <ConfirmAdmin>
            <AddMusic />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/singers",
        element: (
          <ConfirmAdmin>
            <Singers />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/singers/add-singer",
        element: (
          <ConfirmAdmin>
            <AddMusic />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/playlists",
        element: (
          <ConfirmAdmin>
            <Playlist />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/playlists/add-playlist",
        element: (
          <ConfirmAdmin>
            <AddMusic />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/albums",
        element: (
          <ConfirmAdmin>
            <Album />
          </ConfirmAdmin>
        ),
      },
      {
        path: "/admin/musics/albums/add-album",
        element: (
          <ConfirmAdmin>
            <AddMusic />
          </ConfirmAdmin>
        ),
      },
    ],
  },
  {
    path: "/account",
    element: (
      <Auth>
        <Setting />
      </Auth>
    ),
  },
  {
    path: "/profile",
    element: (
      <Auth>
        <Setting />
      </Auth>
    ),
  },
  {
    path: "/settings",
    element: (
      <Auth>
        <Setting />
      </Auth>
    ),
  },

  {
    path: "/login",
    element: (
      <NoAuth>
        <Signin />
      </NoAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <NoAuth>
        <Signup />
      </NoAuth>
    ),
  },
]);
