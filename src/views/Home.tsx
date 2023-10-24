// import "../App.css";
import { useNavigate } from "react-router-dom";
import spacewave from "../assets/videos/spacewave.mp4";
// import stars from "../assets/videos/stars.mp4";
// import ink from "../assets/videos/ink.mp4";

// import homeStyling from "../cssmodules/homeStyling.module.css";

function App() {
	const redirect = useNavigate();
	return (
		<>
			<br></br>

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
					zIndex: -50,
					height: "100vh",
					width: "100vw ",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<video
					autoPlay
					loop
					muted
					id="homevideo"
					style={{
						objectFit: "cover",
						height: "100% ",
						width: "100%",
					}}>
					<source src={spacewave} type="video/mp4" />
					{/* <source src={stars} type="video/mp4" /> */}
					{/* <source src={ink} type="video/mp4" /> */}
				</video>
			</div>
		</>
	);
}

export default App;
