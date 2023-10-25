import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLightDarkMode } from "../context/LightDarkModeContext";
// import Toastify from "toastify-js";

function Nav() {
	const { user, logout } = useContext(AuthContext);
	const redirect = useNavigate();
	const { isLightMode, toggleMode } = useLightDarkMode();

	// const navContainerStyles: React.CSSProperties = {
	// 	height: "50px",
	// 	// border: "solid 1px black",
	// 	display: "flex",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	padding: "0 1em",
	// };

	// const linksContainerStyles: React.CSSProperties = {
	// 	justifyContent: "space-evenly",
	// 	alignItems: "center",
	// 	flexDirection: "row",
	// 	display: "flex",
	// 	gap: "2em",
	// };

	const activeLink: React.CSSProperties = {
		color: "blueviolet",
		fontWeight: "bolder",
	};

	return (
		<nav>
			<div>
				{!user && (
					<>
						<NavLink
							className="nav-link"
							to="/"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Home
						</NavLink>
						<NavLink
							className="nav-link"
							to="/events"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Events
						</NavLink>

						<NavLink
							className="nav-link"
							to="/register"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Register
						</NavLink>

						<NavLink
							className="nav-link"
							to="/about"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							About
						</NavLink>
					</>
				)}

				{user && (
					<>
						<NavLink
							className="nav-link"
							to="/"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Home
						</NavLink>
						<NavLink
							className="nav-link"
							to="/events"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Events
						</NavLink>

						<NavLink
							className="nav-link"
							to="/profile"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Profile
						</NavLink>
						<NavLink
							className="nav-link"
							to="/about"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							About
						</NavLink>
					</>
				)}
			</div>
			<p>
				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={() => redirect("/login")}>Login</button>
				)}

				{user ? (
					<button onClick={() => redirect("/listevent")}>Create event</button>
				) : (
					<button onClick={() => redirect("/register")}>Create event</button>
				)}
			</p>
			<div className={isLightMode ? "light" : "dark"}>
				<button onClick={toggleMode}>Toggle Mode</button>
			</div>
		</nav>
	);
}

export default Nav;
