import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext.tsx";
import Error404 from "./views/Error404.tsx";
import Home from "./views/Home.tsx";
import About from "./views/About.tsx";
import Login from "./views/Login.tsx";
import Events from "./views/Events.tsx";
import UserProfile from "./views/Profile.tsx";
import WithNav from "./components/Layouts/WithNav.tsx";
import EventView from "./views/EventView.tsx";
import WithFooter from "./components/Layouts/Footer/WithFooter.tsx";
import Register from "./views/Register.tsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    ),
    // // putting context at outermost layer of router means it still wraps every route, but is also inside the router and can then use react router dom hooks like useNavigate
    children: [
      {
        element: (
          <>
            <WithNav>
              <Outlet />
            </WithNav>
            <WithFooter />x
          </>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/events",
            element: <Events />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/eventById/:_id",
            element: <EventView />,
          },

          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/profile",
            element: <UserProfile />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
