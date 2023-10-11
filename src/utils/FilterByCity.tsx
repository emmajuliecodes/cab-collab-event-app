// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// async function CityFilter() {
// 	const q = query(collection(db, "events"), where("city: Berlin", "==", true));
// 	const querySnapshot = await getDocs(q);
// 	querySnapshot.forEach((doc) => {
// 		console.log(doc.id, " => ", doc.data());
// 	});

// 	return console.log("data", querySnapshot);
// }

// // To update with test app version once ready

// export default { CityFilter };
