import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { Event } from "../@types";
import getEvents from "../utils/getEvents";

const UserProfile = () => {
	const { user, userData } = useContext(AuthContext);
	const [eventDetails, setEventDetails] = useState<Event[]>([]); // Store event details
	const [invites, setInvites] = useState<Event[]>([]);
	const [acceptedInvites, setAcceptedInvites] = useState<Event[]>([]);
	const [declinedInvites, setDeclinedInvites] = useState<Event[]>([]);

	useEffect(() => {
		// Fetch the user's pending invites when the component mounts
		const fetchUserInvites = async () => {
			console.log("fetchUserInvites is called");

			if (!user && !userData) {
				console.log("No user found");
				return;
			}
			if (userData) {
				try {
					const events1 = await getEvents(userData.myEvents);
					setEventDetails(events1);
					const events2 = await getEvents(userData.attending);
					setAcceptedInvites(events2);
					const events3 = await getEvents(userData.declined);
					setDeclinedInvites(events3);
				} catch (error) {
					console.error("Error fetching user document:", error);
				}
			}
		};

		fetchUserInvites().catch((e) => console.log(e));
	}, [userData]);

	const handleResponse = async (eventId: string, response: string) => {
		if (!user) return; // Check if user is not null

		const userDocRef = doc(db, "users", user.uid);
		const eventDocRef = doc(db, "events", eventId);

		const userDoc = await getDoc(userDocRef);
		const eventDoc = await getDoc(eventDocRef);

		if (userDoc.exists() && eventDoc.exists()) {
			const userData = userDoc.data();
			const eventData = eventDoc.data();

			const updatedPendingInvites = userData.pendingInvites.filter(
				(id: string) => id !== eventId
			);
			const updatedAcceptedInvites: string[] = [
				...(userData.acceptedInvites || []),
			];
			const updatedDeclinedInvites: string[] = [
				...(userData.declinedInvites || []),
			];

			const eventAcceptedUsers: string[] = [...(eventData.acceptedUsers || [])];
			const eventDeclinedUsers: string[] = [...(eventData.declinedUsers || [])];

			if (response === "accept") {
				updatedAcceptedInvites.push(eventId);
				eventAcceptedUsers.push(user.uid);
			} else {
				updatedDeclinedInvites.push(eventId);
				eventDeclinedUsers.push(user.uid);
			}

			await updateDoc(userDocRef, {
				pendingInvites: updatedPendingInvites,
				acceptedInvites: updatedAcceptedInvites,
				declinedInvites: updatedDeclinedInvites,
			});

			await updateDoc(eventDocRef, {
				acceptedUsers: eventAcceptedUsers,
				declinedUsers: eventDeclinedUsers,
			});

			setPendingInvites(updatedPendingInvites);
			setAcceptedInvites(updatedAcceptedInvites);
			setDeclinedInvites(updatedDeclinedInvites);
		}
	};

	return (
		<div>
			<h2>Pending Invites</h2>
			{eventDetails.map((event) => (
				<div key={event.id}>
					<h3>{event.eventName}</h3>
					<p>Date: {event.date}</p>
					<p>Location: {event.location}</p>
					<button onClick={() => handleResponse(event.id, "accept")}>
						Accept
					</button>
					<button onClick={() => handleResponse(event.id, "decline")}>
						Decline
					</button>
				</div>
			))}
			<h2>Accepted Invites</h2>
			{acceptedInvites.map((eventId) => (
				<p key={eventId}>{eventId}</p>
			))}

			<h2>Declined Invites</h2>
			{declinedInvites.map((eventId) => (
				<p key={eventId}>{eventId}</p>
			))}
		</div>
	);
};

export default UserProfile;
