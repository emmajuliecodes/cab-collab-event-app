// import { useContext } from "react";
// import spacewave from "../../assets/videos/spacewave.mp4";
// import ink from "../../assets/videos/ink.mp4";
// import { LightDarkModeContext } from "../../context/LightDarkModeContext";

// type Props = {
// 	children: React.ReactNode;
// };

// const WithBackgroundVideo = (props: Props) => {
// 	const isLightMode = useContext(LightDarkModeContext);
// 	return (
// 		<div>
// 			<video
// 				autoPlay
// 				loop
// 				muted
// 				id="homevid   "
// 				style={{
// 					objectFit: "cover",
// 					height: "100vh ",
// 					width: "100vw",
// 					zIndex: -100,
// 				}}>
// 				{/* <source src={spacewave} type="video/mp4" /> */}
// 				<source src={isLightMode ? ink : spacewave} type="video/mp4" />
// 			</video>
// 			{props.children}
// 		</div>
// 	);
// };

// export default WithBackgroundVideo;
