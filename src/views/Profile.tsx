import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/FirebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { Event } from "../@types";
import getEvents from "../utils/getEvents";
import ProfileEventCards from "../components/ProfileEventCards";

const UserProfile = () => {
	const { user, userData, checkActiveUser } = useContext(AuthContext);
	const [myEvents, setMyEvents] = useState<Event[]>([]); // Store event details
	const [invites, setInvites] = useState<Event[]>([]);
	const [acceptedInvites, setAcceptedInvites] = useState<Event[]>([]);
	const [declinedInvites, setDeclinedInvites] = useState<Event[]>([]);

	useEffect(() => {
		// Fetch the user's pending invites when the component mounts
		const fetchUserInvites = async () => {
			if (!userData) {
				console.log("No user found");
				return;
			}
				try {
					const events1 = await getEvents(userData.myEvents);
					setMyEvents(events1);
          const events2 = await getEvents(userData.invites);
          setInvites(events2);
					const events3 = await getEvents(userData.attending);
					setAcceptedInvites(events3);
					const events4 = await getEvents(userData.declined);
					setDeclinedInvites(events4);
				} catch (error) {
					console.error("Error fetching user document:", error);
				}
			}

		fetchUserInvites().catch((e) => console.log(e));
	}, [userData]);

	const handleResponse = async (eventId: string, response: string) => {
		if (!user) return; // Check if user is not null

		const userDocRef = doc(db, "users", user.uid);
		const eventDocRef = doc(db, "events", eventId);

    // remove event from invites array on userData
    // add event to either "attending" or "declined" (determined by response string passed as params)
    await updateDoc(userDocRef, {
      invites: arrayRemove(eventId),
      [`${response}`]: arrayUnion(eventId)
    })

    // remove user from pending array on event
    // add user to either "attending" or "declined" (determined by response string passed as params)
    await updateDoc(eventDocRef, {
      pending: arrayRemove(user.uid),
      [`${response}`]: arrayUnion(user.uid)
    })
    
    // function from authContext to refresh user & userData with fresh database results
    // updating those states then triggers the fetchInvites useEffect to run again, updating all arrays with new values
    checkActiveUser();
	};

	return (
		<div>
      <div>
      <h1>User Profiles</h1>
      <div>
        {userData && (
          <>
            <p>Name: {userData.name.toUpperCase()}</p>
            <p>Email: {userData.email}</p>
            <p>City: {userData.city}</p>
            {/* <p>Invites: {userData.invites} </p>
            <p>Attending: {userData.attending}</p>
            <p>Declined: {userData.declined}</p>
            My Events:
            <ul>
              {userData.myEvents.map((event, idx) => {
                return <li key={idx}>{event}</li>;
              })}
            </ul> */}
          </>
        )}
      </div>
    </div>

			<h2>Pending Invites</h2>
      {/* pending invites will have buttons to accept/decline */}
			<ProfileEventCards events={invites} pending={true} handleResponse={handleResponse} />

			<h2>Accepted Invites</h2>
			<ProfileEventCards events={acceptedInvites} />

			<h2>Declined Invites</h2>
			<ProfileEventCards events={declinedInvites} />

      <h2>My Events</h2>
			<ProfileEventCards events={myEvents} />
		</div>
	);
};

export default UserProfile;
