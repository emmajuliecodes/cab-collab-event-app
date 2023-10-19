import { db } from "../firebase/FirebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { Event, User } from "../@types";

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
					return <EventListItem event={e} />;
				})}
			</div>
		</>
	);
}

type EventListItemProps = { event: Event & { id: string } };

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
	const [userData, setUserData] = useState<User | null>(null);
	useEffect(() => {
		const fetchUserById = async () => {
			const creatorUserId = event.creator_id as string;
			const docRef = doc(db, "users", creatorUserId);

			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log("doc data", docSnap.data());
				const data = docSnap.data() as User;
				setUserData(data);
			} else {
				// setError("Something went wrong :( ");
				console.log("No document exists");
			}
		};
		fetchUserById().catch((e) => console.log(e));
	}, []);

	return (
		<>
			<p>Name: {event.eventName}</p>
			<p>Date: {event.date}</p>
			<p>City: {event.city}</p>
			<p>Creator: {userData?.name}</p>
			<Link to={`/eventById/${event.id}`}>View event</Link>
			<br></br>
			<br></br>
		</>
	);
};

// Look into how to add error message if no events or fetch didn't work?
// How to set up filter eg. by city - where to place function within here? Create hook so can be used elsewhere? Component?

export default EventsListView;
