import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { LightDarkModeProvider } from "./context/LightDarkModeContext.tsx";
import Error404 from "./views/Error404.tsx";
import Home from "./views/Home.tsx";
import FilterByCity from "./views/About.tsx";
import Login from "./views/Login.tsx";
import EventsListView from "./views/EventsListView.tsx";
import UserProfile from "./views/Profile.tsx";
import WithNav from "./components/Layouts/WithNav.tsx";
import EventDetailView from "./views/EventDetailView.tsx";

import Register from "./views/Register.tsx";

import EventForm from "./components/EventForm.tsx";

import TestingPage from "./views/Testing.tsx";

const router = createBrowserRouter([
	{
		element: (
			<AuthContextProvider>
				<LightDarkModeProvider>
					<Outlet />
				</LightDarkModeProvider>
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
					</>
				),
				children: [
					{
						path: "/",
						element: <Home />,
					},
					{
						path: "/events",
						element: <EventsListView />,
					},
					{
						path: "/login",
						element: <Login />,
					},
					{
						path: "/eventById/:id",
						element: <EventDetailView />,
					},

					{
						path: "/about",
						element: <FilterByCity />,
					},
					{
						path: "/profile",
						element: <UserProfile />,
					},
					{
						path: "/register",
						element: <Register />,
					},

					{
						path: "/testing",
						element: <TestingPage />,
					},
					{
						path: "/listevent",
						element: <EventForm />,
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
		<ToastContainer />
	</React.StrictMode>
);
