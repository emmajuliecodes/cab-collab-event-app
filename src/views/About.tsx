import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Event } from "../@types";

import { useEffect, useState } from "react";

function FilterByCity() {
	const [cityArray, setCityArray] = useState<(Event & { id: string })[]>([]);

	useEffect(() => {
		const fetchByCity = async () => {
			const q = query(collection(db, "events"), where("city", "=="));
			const querySnapshot = await getDocs(q);
			console.log("querySnapshot", querySnapshot);
			const cityArray: (Event & { id: string })[] = querySnapshot.docs.map(
				(doc) => {
					const eventData = doc.data() as Event;
					return { ...eventData, id: doc.id };
				}
			);

			setCityArray(cityArray);
			console.log(cityArray, "cityArray");
		};

		fetchByCity().catch((e) => console.log(e));
	}, []);

	return (
		<>
			<h1>Testing City Filters</h1>

			{cityArray.map((e) => {
				return (
					<>
						<p>Name: {e.eventName}</p>
						<p>City: {e.city}</p>
					</>
				);
			})}
		</>
	);
}

export default FilterByCity;
