import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [eventDetails, setEventDetails] = useState<any[]>([]); // Store event details
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [acceptedInvites, setAcceptedInvites] = useState<string[]>([]);
  const [declinedInvites, setDeclinedInvites] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the user's pending invites when the component mounts
    const fetchUserInvites = async () => {
      console.log("fetchUserInvites is called");

      if (!user) {
        console.log("No user found");
        return;
      }
      console.log("User exists:", user.uid);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists) {
          console.log("User document doesn't exist in database for UID:", user.uid);
          return;
        }

        console.log("User document exists");
        const userData = userDoc.data();

        if (!userData) {
          console.error("User data is undefined for UID:", user.uid);
          return;
        }

        const pendingInvites = userData.pendingInvites || [];
        console.log("Pending invites:", pendingInvites);

        // Fetch event details for each pending invite
        const events = await Promise.all(
          pendingInvites.map(async (eventId: string) => {
            const eventDocRef = doc(db, "events", eventId);
            const eventDoc = await getDoc(eventDocRef);
            if (!eventDoc.exists()) {
              console.warn(`Event with ID ${eventId} does not exist.`);
              return null; // Return null for non-existent events
            }
            return { ...eventDoc.data(), id: eventId }; // Include the eventId in the returned object
          })
        );
        console.log("Fetched events:", events);

        setEventDetails(events.filter(Boolean)); // Filter out any null values
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    fetchUserInvites();
  }, [user]);

  const handleResponse = async (eventId: string, response: string) => {
    if (!user) return; // Check if user is not null

    const userDocRef = doc(db, "users", user.uid);
    const eventDocRef = doc(db, "events", eventId);

    const userDoc = await getDoc(userDocRef);
    const eventDoc = await getDoc(eventDocRef);

    if (userDoc.exists() && eventDoc.exists()) {
      const userData = userDoc.data();
      const eventData = eventDoc.data();

      const updatedPendingInvites = userData.pendingInvites.filter((id: string) => id !== eventId);
      const updatedAcceptedInvites: string[] = [...(userData.acceptedInvites || [])];
      const updatedDeclinedInvites: string[] = [...(userData.declinedInvites || [])];

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
          <button onClick={() => handleResponse(event.id, "accept")}>Accept</button>
          <button onClick={() => handleResponse(event.id, "decline")}>Decline</button>
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
