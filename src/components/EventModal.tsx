import React, { useState } from "react";

const EventModal: React.FC = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    attendees: "",
    invitees: "",
    location: "",
    description: "",
    eventName: "",
    host: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here, you can access form data from formData state
    // You can also send this data to a server or perform other actions as needed.
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* Event form fields */}
        <div>
          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} />
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventModal;
