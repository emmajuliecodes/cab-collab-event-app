import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import React, { useState, useEffect } from "react";
import { Event } from "../@types";
import { useParams } from "react-router-dom";

function EventDetailView(): React.ReactElement | null {
	const { id } = useParams();
	const [eventData, setEventData] = useState<Event | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchEventById = async () => {
			const stringid = id as string;
			const docRef = doc(db, "events", stringid);

			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log("doc data", docSnap.data());
				const data = docSnap.data() as Event;
				setEventData(data);
			} else {
				setError("Something went wrong :( ");
				console.log("No document exists");
			}
		};
		fetchEventById().catch((e) => console.log(e));
	}, [id]);
	console.log(id);

	return (
		<>
			<h1>Event information</h1>
			{eventData && (
				<div className="event-detail">
					<p>{eventData.eventName}</p>
					<img
						src={eventData.image}
						alt="Event image"
						style={{ height: "100px", width: "100px" }}></img>
					<p>{eventData.date}</p>
					<p>{eventData.city}</p>
					<p>About this event: {eventData.description}</p>
				</div>
			)}
			{error && <p>{error}</p>}
		</>
	);
}

export default EventDetailView;

// adjust set data to stop it complaining about eventData
