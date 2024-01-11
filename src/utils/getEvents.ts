import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { Event } from "../@types";

async function getEvents(array: string[]): Promise<Event[]> {
  const events = await Promise.allSettled(
    array.map(async (eventId) => {
      const eventDocRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventDocRef);
      if (eventDoc.exists()) {
        const result = eventDoc.data() as Event;
        result.id = eventDoc.id;
        return result;
      }
      return null;
    })
  );

  // Filter out the fulfilled promises and extract the value from them
  const result = events
    .filter((eventResult): eventResult is PromiseFulfilledResult<Event> => eventResult.status === "fulfilled")
    .map((eventResult) => eventResult.value)
    .filter((event): event is Event => event !== null);

  return result;
}

export default getEvents;
