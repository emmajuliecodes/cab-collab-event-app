import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Event } from "../@types";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EventsListView() {
	const [eventsArray, setEventsArray] = useState<(Event & { id: string })[]>(
		[]
	);

	useEffect(() => {
		const fetchEvents = async () => {
			const q = query(collection(db, "events"));
			const querySnapshot = await getDocs(q);
			console.log("querySnapshot", querySnapshot);
			const eventsArray: (Event & { id: string })[] = querySnapshot.docs.map(
				(doc) => {
					const eventData = doc.data() as Event;
					return { ...eventData, id: doc.id };
				}
			);

			setEventsArray(eventsArray);
			console.log("eventsArray", eventsArray);
		};

		fetchEvents().catch((e) => console.log(e));
	}, []);

	return (
		<>
			<h1>Events go here...</h1>

			{/* My Events component here? */}

			<div className="event-listing">
				{/* if events array is zero && return p tag no events */}

				{eventsArray.map((e) => {
					return (
						<>
							<p>Name: {e.eventName}</p>
							<p>Date: {e.date}</p>
							<p>City: {e.city}</p>
							<Link to={`/eventById/${e.id}`}>View event</Link>
							<br></br>
							<br></br>
						</>
					);
				})}
			</div>
		</>
	);
}

// Look into how to add error message if no events or fetch didn't work?
// How to set up filter eg. by city - where to place function within here? Create hook so can be used elsewhere? Component?

export default EventsListView;
