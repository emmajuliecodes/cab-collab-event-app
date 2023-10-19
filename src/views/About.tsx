import { db } from "../firebase/FirebaseConfig";
import {
	DocumentData,
	Query,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { Event } from "../@types";

import { useEffect, useState } from "react";

function FilterByCity() {
	const [cityArray, setCityArray] = useState<(Event & { id: string })[]>([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const q = query(collection(db, "events"));
		fetchByCity(q).catch((e) => console.log(e));
	}, []);

	const fetchByCity = async (q: Query<DocumentData, DocumentData>) => {
		console.log(inputValue, "inputvalue");
		const querySnapshot = await getDocs(q);
		console.log("querySnapshot", querySnapshot);
		const foundArray: (Event & { id: string })[] = querySnapshot.docs.map(
			(doc) => {
				const eventData = doc.data() as Event;
				return { ...eventData, id: doc.id };
			}
		);

		setCityArray(foundArray);
		console.log(foundArray, "foundArray");
	};

	const HandleClick = () => {
		const q = query(collection(db, "events"), where("city", "==", inputValue));
		fetchByCity(q).catch((e) => console.log(e));
	};

	return (
		<>
			<h1>Testing City Filters</h1>

			<div className="search-bar">
				<input
					type="text"
					id="citysearch"
					name="citysearch"
					placeholder="Search for a city..."
					onChange={(i) => {
						setInputValue(i.target.value);
					}}
				/>
				<button onClick={HandleClick}>Click me</button>
			</div>

			{cityArray.length === 0 ? (
				<p>No events available for this city - why not try somewhere else?</p>
			) : (
				cityArray.map((e) => {
					return (
						<>
							<p>Name: {e.eventName}</p>
							<p>City: {e.city}</p>
						</>
					);
				})
			)}
		</>
	);
}

// function FilterPublic() {
// 	const [publicArray, setPublicArray] = useState<(Event & { id: string })[]>(
// 		[]
// 	);

// 	useEffect(() => {
// 		const q = query(collection(db, "events"));
// 		fetchIfPublic(q).catch((e) => console.log(e));
// 	}, []);

// 	const fetchIfPublic = async (q: Query<DocumentData, DocumentData>) => {
// 		const querySnapshot = await getDocs(q);
// 		console.log("querySnapshot", querySnapshot);
// 		const foundPublicArray: (Event & { id: string })[] = querySnapshot.docs.map(
// 			(doc) => {
// 				const eventData = doc.data() as Event;
// 				return { ...eventData, id: doc.id };
// 			}
// 		);

// 		setPublicArray(foundPublicArray);
// 		console.log(foundPublicArray, "foundArray");
// 	};

// 	const HandleClick = () => {
// 		const q = query(collection(db, "events"), where("public", "==", true));
// 		fetchIfPublic(q).catch((e) => console.log(e));
// 	};

// 	return (
// 		<>
// 			<h1>Testing Public Filter</h1>

// 			<div className="search-bar">
// 				<button onClick={HandleClick}>Click me</button>
// 			</div>
// 			<div>
// 				{publicArray.length === 0 ? (
// 					<p>No events available for this city - why not try somewhere else?</p>
// 				) : (
// 					publicArray.map((e) => {
// 						return (
// 							<>
// 								<p>Name: {e.eventName}</p>
// 								<p>City: {e.city}</p>
// 							</>
// 						);
// 					})
// 				)}
// 			</div>
// 		</>
// 	);
// }

export default FilterByCity;
