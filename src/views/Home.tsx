// import "../App.css";
import { useNavigate } from "react-router-dom";
import spacewave from "../assets/videos/spacewave.mp4";
// import stars from "../assets/videos/stars.mp4";
// import ink from "../assets/videos/ink.mp4";

// import homeStyling from "../cssmodules/homeStyling.module.css";

function App() {
	const redirect = useNavigate();
	return (
		<div>
			<video
				autoPlay
				loop
				muted
				id="homevideo"
				style={{
					objectFit: "cover",
					height: "100vw ",
					width: "100vh",
					zIndex: "-100",
				}}>
				<source src={spacewave} type="video/mp4" />
				{/* <source src={stars} type="video/mp4" /> */}
				{/* <source src={ink} type="video/mp4" /> */}
			</video>
			<div
				style={{
					position: "absolute",
					top: "7em",

					height: "100%",
					width: "100vw ",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
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

export default App;
