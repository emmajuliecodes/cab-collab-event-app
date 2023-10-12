import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import Toastify from "toastify-js";

function Nav() {
  const { user, logout } = useContext(AuthContext);
  const redirect = useNavigate();

  const navContainerStyles: React.CSSProperties = {
    height: "50px",
    // border: "solid 1px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1em",
  };

  const linksContainerStyles: React.CSSProperties = {
    display: "flex",

    gap: "2em",
  };

  const activeLink: React.CSSProperties = {
    color: "darkcyan",
    fontWeight: "bolder",
  };

  return (
    <nav style={navContainerStyles}>
      <div style={linksContainerStyles}>
        {!user && (
          <>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeLink : {})}>
              Home
            </NavLink>
            <NavLink to="/events" style={({ isActive }) => (isActive ? activeLink : {})}>
              Events
            </NavLink>

            <NavLink to="/register" style={({ isActive }) => (isActive ? activeLink : {})}>
              Register
            </NavLink>

            <NavLink to="/about" style={({ isActive }) => (isActive ? activeLink : {})}>
              About
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeLink : {})}>
              Home
            </NavLink>
            <NavLink to="/events" style={({ isActive }) => (isActive ? activeLink : {})}>
              Events
            </NavLink>

            <NavLink to="/profile" style={({ isActive }) => (isActive ? activeLink : {})}>
              Profile
            </NavLink>
            <NavLink to="/about" style={({ isActive }) => (isActive ? activeLink : {})}>
              About
            </NavLink>
          </>
        )}
      </div>
      <p> {user ? <button onClick={logout}>Logout</button> : <button onClick={() => redirect("/login")}>Login</button>}</p>
      {user ? <button onClick={() => redirect("/listevent")}>Create event</button> : <button onClick={() => redirect("/create-event")}>Create event</button>}
    </nav>
  );
}

export default Nav;
