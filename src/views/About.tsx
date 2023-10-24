
=======
import { db } from "../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Event } from "../@types";

import { useCallback, useEffect, useState } from "react";

function VisitorEventView() {
	const [cityArray, setCityArray] = useState<(Event & { id: string })[]>([]);
	const [inputValue, setInputValue] = useState("");

	const fetchByCity = useCallback(async () => {
		const publicAndCityEventQuery = query(
			collection(db, "events"),
			where("eventType", "==", "public"),
			where("city", "==", inputValue)
		);

		const publicEventQuery = query(
			collection(db, "events"),
			where("eventType", "==", "public")
		);

		console.log(inputValue, "inputvalue");
		const querySnapshot = await getDocs(
			inputValue.length == 0 ? publicEventQuery : publicAndCityEventQuery
		);

		console.log("querySnapshot", querySnapshot);
		const foundArray: (Event & { id: string })[] = querySnapshot.docs.map(
			(doc) => {
				const eventData = doc.data() as Event;
				return { ...eventData, id: doc.id };
			}
		);

		setCityArray(foundArray);
		console.log(foundArray, "foundArray");
	}, [inputValue]);

	const HandleClick = () => {
		fetchByCity().catch((e) => console.log(e));
	};

	useEffect(() => {
		fetchByCity().catch((e) => console.log(e));
	}, [fetchByCity]);

	return (
		<>
			<h1>Events</h1>


      <div className='search-bar'>
        <input
          type='text'
          id='citysearch'
          name='citysearch'
          placeholder='Search for a city...'
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
							<p>Type: {e.eventType}</p>
						</>
					);
				})
			)}
		</>
	);

}

export default VisitorEventView;
