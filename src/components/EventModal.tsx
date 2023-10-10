import React, { useState } from "react";
import { db } from "../firebaseConfig"; // replace with your path
import { collection, addDoc } from "firebase/firestore";

const EventModal: React.FC = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    invitees: "",
    location: "",
    description: "",
    eventName: "",
    host: "",
    image: "",
    eventType: "public", // Default value
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError(null); // Clear errors upon change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //  Validation
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        setFormError(`Please provide a ${key}`);
        return;
      }
    }

    const startTime = new Date(`1970-01-01T${formData.startTime}Z`);
    const endTime = new Date(`1970-01-01T${formData.endTime}Z`);

    if (startTime >= endTime) {
      setFormError("End time must be later than start time");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "events"), formData);
      console.log("Document written with ID: ", docRef.id);

      //Resetting form data after successful submission
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        attendees: "",
        invitees: "",
        location: "",
        description: "",
        eventName: "",
        host: "",
        image: "",
        eventType: "public",
      });

      setFormError(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      setFormError("Error submitting form. Try again later."); // Display an error to the user
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="attendees">Attendees:</label>
          <input type="text" id="attendees" name="attendees" value={formData.attendees} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="invitees">Invitees:</label>
          <input type="text" id="invitees" name="invitees" value={formData.invitees} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="host">Host:</label>
          <input type="text" id="host" name="host" value={formData.host} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="eventType">Event Type:</label>
          <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventModal;
