import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import { Event } from "../@types";
import { useParams } from "react-router-dom";

function EventDetailView(): React.ReactElement | null {
	// const { id } = useParams()
	// const [eventData, setEventData] = useState<Event>;

	// useEffect(() => {
	// 	const fetchEventById = async () => {

	// 		// const { _id } = useParams();
	// 		const docRef = doc(db, "events", "ixPT2HtIDQSSokWcSwfN");

	// 		const docSnap = await getDoc(docRef);

	// 		if (docSnap.exists()) {
	// 			setEventData({ ...docSnap.data() });
	// 			console.log("doc data", docSnap.data());
	// 		} else {
	// 			setEventData({});
	// 		}
	// 	}
	// 	fetchEventById()
	// }, [id]);

	return (
		<>
			<p>Event infoooooo</p>
			<div className="event-detail"></div>
		</>
	);
}

export default EventDetailView;
