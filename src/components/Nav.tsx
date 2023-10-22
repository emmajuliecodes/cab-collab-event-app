import { useContext, useEffect, useState, CSSProperties } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import Toastify from "toastify-js";

function Nav() {
	const { user, logout } = useContext(AuthContext);
	const redirect = useNavigate();

	// const [scrollNav, setScrollNav] = useState(false);
	// const [isMouseMoving, setIsMouseMoving] = useState(false);

	// const navStyles: CSSProperties = {
	// 	background: scrollNav ? "#fce6d1" : "transparent",
	// 	height: "60px", // Make sure to enclose height in quotes
	// 	width: "100%", // Make sure to enclose width in quotes
	// 	marginTop: "-0px", // Make sure to enclose marginTop in quotes
	// 	display: "flex", // Make sure to enclose display in quotes
	// 	justifyContent: "space-between", // Make sure to enclose justifyContent in quotes
	// 	padding: "0.5rem ", // Make sure to enclose padding in quotes
	// 	zIndex: 10,
	// 	position: "fixed", // Make sure to enclose position in quotes
	// 	transition: "0.4s ease-in-out", // Make sure to enclose transition in quotes
	// 	top: isMouseMoving ? "0" : "-20%", // Make sure to enclose top in quotes: ;
	// };

	const navContainerStyles: React.CSSProperties = {
		height: "50px",
		// border: "solid 1px black",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "0 1em",
	};

	const linksContainerStyles: React.CSSProperties = {
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",
		display: "flex",
		gap: "2em",
	};

	const activeLink: React.CSSProperties = {
		color: "darkcyan",
		fontWeight: "bolder",
	};

	// useEffect(() => {
	// 	window.addEventListener("scroll", changeNav);

	// 	// Add event listeners for mouse movement
	// 	window.addEventListener("mousemove", handleMouseMove);

	// 	return () => {
	// 		window.removeEventListener("scroll", changeNav);

	// 		// Remove event listeners when component unmounts
	// 		window.removeEventListener("mousemove", handleMouseMove);
	// 	};
	// }, []);

	// const handleMouseMove = () => {
	// 	setIsMouseMoving(true);
	// };

	// const changeNav = () => {
	// 	setScrollNav(window.scrollY >= 80);
	// };

	return (
		<nav style={navContainerStyles}>
			<div style={linksContainerStyles}>
				{!user && (
					<>
						<NavLink
							to="/"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Home
						</NavLink>
						<NavLink
							to="/events"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Events
						</NavLink>

						<NavLink
							to="/register"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Register
						</NavLink>

						<NavLink
							to="/about"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							About
						</NavLink>
					</>
				)}

				{user && (
					<>
						<NavLink
							to="/"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Home
						</NavLink>
						<NavLink
							to="/events"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Events
						</NavLink>

						<NavLink
							to="/profile"
							style={({ isActive }) => (isActive ? activeLink : {})}>
							Profile
						</NavLink>
						<NavLink
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
		</nav>
	);
}

export default Nav;
