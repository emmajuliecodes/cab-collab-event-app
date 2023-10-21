import { db } from "../firebase/FirebaseConfig";
import {
	DocumentData,
	Query,
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import { Event, User } from "../@types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function EventsListView() {
	// CATEGORY FILTER - Wait til event form updated

	// 	const [categoryEventsArray, setCategoryEventsArray] = useState<
	// 		(Event & { id: string })[]
	// 	>([]);

	// 	useEffect(() => {
	// 		const q = query(
	// 			collection(db, "events"),
	// 			where("eventType", "==", "public")
	// 		);
	// 		fetchIfPublic(q).catch((e) => console.log(e));
	// 	}, []);

	// 	const fetchIfPublic = async (q: Query<DocumentData, DocumentData>) => {
	// 		const querySnapshot = await getDocs(q);
	// 		console.log("querySnapshot", querySnapshot);
	// 		const foundCategoryEventsArray: (Event & { id: string })[] =
	// 			querySnapshot.docs.map((doc) => {
	// 				const eventData = doc.data() as Event;
	// 				return { ...eventData, id: doc.id };
	// 			});

	// 		setCategoryEventsArray(foundCategoryEventsArray);
	// 		console.log(foundCategoryEventsArray, "foundArray");
	// 	};

	// 	return (
	// 		<>
	// 			<h1>Events go here...</h1>

	// 			{/* My Events component here? */}

	// 			<div className="event-listing">
	// 				{/* if events array is zero && return p tag no events */}

	// 				{categoryEventsArray.map((e) => {
	// 					return <EventListItem event={e} />;
	// 				})}
	// 			</div>
	// 		</>
	// 	);
	// }

	// type EventListItemProps = { event: Event & { id: string } };

	// const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
	// 	const [userData, setUserData] = useState<User | null>(null);
	// 	useEffect(() => {
	// 		const fetchUserById = async () => {
	// 			const creatorUserId = event.creator_id as string;
	// 			const docRef = doc(db, "users", creatorUserId);

	// 			const docSnap = await getDoc(docRef);

	// 			if (docSnap.exists()) {
	// 				console.log("doc data", docSnap.data());
	// 				const data = docSnap.data() as User;
	// 				setUserData(data);
	// 			} else {
	// 				// setError("Something went wrong :( ");
	// 				console.log("No document exists");
	// 			}
	// 		};
	// 		fetchUserById().catch((e) => console.log(e));
	// 	}, []);

	// 	return (
	// 		<>
	// 			<p>Name: {event.eventName}</p>
	// 			<p>Date: {event.date}</p>
	// 			<p>City: {event.city}</p>
	// 			<p>Creator: {userData?.name}</p>
	// 			<p>Event Type: {event.eventType}</p>
	// 			<Link to={`/eventById/${event.id}`}>View event</Link>
	// 			<br></br>
	// 			<br></br>
	// 		</>
	// 	);
	// };

	// PUBLIC OR PRIVATE FILTER

	const [publicEventsArray, setPublicEventsArray] = useState<
		(Event & { id: string })[]
	>([]);

	useEffect(() => {
		const q = query(
			collection(db, "events"),
			where("eventType", "==", "public")
		);
		fetchIfPublic(q).catch((e) => console.log(e));
	}, []);

	const fetchIfPublic = async (q: Query<DocumentData, DocumentData>) => {
		const querySnapshot = await getDocs(q);
		console.log("querySnapshot", querySnapshot);
		const foundPublicEventsArray: (Event & { id: string })[] =
			querySnapshot.docs.map((doc) => {
				const eventData = doc.data() as Event;
				return { ...eventData, id: doc.id };
			});

		setPublicEventsArray(foundPublicEventsArray);
		console.log(foundPublicEventsArray, "foundArray");
	};

	return (
		<>
			<h1>Public events only - visitor default list </h1>

			{/* My Events component here? */}

			<div className="event-listing">
				{/* if events array is zero && return p tag no events */}

				{publicEventsArray.map((e) => {
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
			<p>Event Type: {event.eventType}</p>
			<Link to={`/eventById/${event.id}`}>View event</Link>
			<br></br>
			<br></br>
		</>
	);
};

// Look into how to add error message if no events or fetch didn't work?
// How to set up filter eg. by city - where to place function within here? Create hook so can be used elsewhere? Component?

export default EventsListView;
