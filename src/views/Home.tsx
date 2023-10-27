// import "../App.css";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { LightDarkModeContext } from "../context/LightDarkModeContext";
// import { BackgroundVideo } from "../context/LightDarkModeContext";

// import ink from "../assets/videos/ink.mp4";

// import homeStyling from "../cssmodules/homeStyling.module.css";

function Home() {
	const redirect = useNavigate();
	// const isLightMode = useContext(LightDarkModeContext);

	return (
		<div>
			<div
				style={{
					position: "fixed",
					top: "7em",
					zIndex: 0,
					height: "100%",
					width: "100vw ",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					objectFit: "cover",
				}}>
				<h1>EventSpace</h1>
				<h3>Much better than Facebook events...</h3>
				<br></br>
				<button onClick={() => redirect("/listevent")}>Create event</button>
				<br></br>
				<br></br>
				<button onClick={() => redirect("/events")}>Browse events</button>
				<br></br>
				<br></br>
			</div>
		</div>
	);
}

export default Home;
