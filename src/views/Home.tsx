// import "../App.css";
import { useNavigate } from "react-router-dom";
import spacewave from "../assets/videos/spacewave.mp4";
// import stars from "../assets/videos/stars.mp4";
// import ink from "../assets/videos/ink.mp4";

// import homeStyling from "../cssmodules/homeStyling.module.css";
function Home() {
	const redirect = useNavigate();

	return (
		<div
			style={{
				position: "absolute",
				top: "100px",
				zIndex: 0,
				height: "100vh",
				width: "100vw ",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
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
					zIndex: -"100",
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
						// zIndex: "-100",
					}}>
					<source src={spacewave} type="video/mp4" />
				</video>
			</div>
		</div>
	);
}

export default Home;
