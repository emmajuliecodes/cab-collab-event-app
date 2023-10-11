import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Event } from "../@types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllEvents() {
  const [eventsArray, setEventsArray] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(db, "events"));
      const querySnapshot = await getDocs(q);
      const eventsArray: Event[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Event;
        eventsArray.push({ ...data, id: doc.id });
      });

      setEventsArray(eventsArray);
    };
    fetchEvents().catch((e) => console.log(e));
  }, []);

  const imageStyle = {
    width: "200px",
    height: "auto",
  };

  return (
    <>
      <h1>Events go here...</h1>
      <div className="event-listing">
        {eventsArray.map((e) => {
          return (
            <div key={e.id} className="event-item">
              <p>Name:{e.eventName}</p>
              {/* Add Image Here */}
              {e.image && <img src={e.image} alt={e.eventName} style={imageStyle} />}
              <p>Date:{e.date}</p>
              <p>City: {e.city}</p>
              <Link to={`/eventById/${e.id}`}>View event</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllEvents;
