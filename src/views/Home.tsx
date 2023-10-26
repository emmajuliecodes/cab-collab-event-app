// import "../App.css";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { LightDarkModeContext } from "../context/LightDarkModeContext";
// import { BackgroundVideo } from "../context/LightDarkModeContext";

// import ink from "../assets/videos/ink.mp4";
import spacewave from "../assets/videos/spacewave.mp4";

// import homeStyling from "../cssmodules/homeStyling.module.css";

function App() {
	const redirect = useNavigate();
	// const isLightMode = useContext(LightDarkModeContext);

	return (
		// <div
		// 	style={{
		// 		display: "flex",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		flexDirection: "column",
		// 		width: "100vw",
		// 		height: "100vh",
		// 	}}>
		<div>
			<h1>EventSpace</h1>
			<h2>Much better than Facebook events...</h2>
			<br></br>
			<button onClick={() => redirect("/listevent")}>Create event</button>
			<br></br>
			<br></br>
			<button onClick={() => redirect("/events")}>Browse events</button>
			<br></br>
			<br></br>
			<div
				style={{
					position: "absolute",
					top: 0,
					zIndex: -10,
					height: "100%",
					width: "100vw ",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					objectFit: "cover",
				}}>
				<video
					autoPlay
					loop
					muted
					id="homevid   "
					style={{
						objectFit: "cover",
						height: "100vh ",
						width: "100vw",
					}}>
					<source src={spacewave} type="video/mp4" />
					{/* <source src={isLightMode ? spacewave : ink} type="video/mp4" /> */}
				</video>
			</div>
		</div>
	);
}

export default App;
