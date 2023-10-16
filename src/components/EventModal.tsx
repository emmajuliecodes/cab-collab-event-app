import React, { useState, useContext } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

const EventModal: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    invitees: "",
    location: "",
    description: "",
    eventName: "",
    host: "",
    image: "",
    eventType: "public",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
  };

  const uploadImageAndGetURL = async () => {
    if (!imageFile) return null;

    const storage = getStorage();
    const storageRef = ref(storage, "images/" + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    if (!user) {
      setFormError("You need to be logged in to create an event.");
      setUploading(false);
      return;
    }
    if (!imageFile) {
      setFormError(`Please provide an image`);
      setUploading(false);
      return;
    }
    const startTime = new Date(`1970-01-01T${formData.startTime}Z`);
    const endTime = new Date(`1970-01-01T${formData.endTime}Z`);

    if (startTime >= endTime) {
      setFormError("End time must be later than start time");
      setUploading(false);
      return;
    }

    try {
      const imageUrl = await uploadImageAndGetURL();

      const newEvent = { ...formData, image: imageUrl || "", creator_id: user?.uid || "" };
      const docRef = await addDoc(collection(db, "events"), newEvent);

      console.log("Document written with ID: ", docRef.id);

      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        invitees: "",
        location: "",
        description: "",
        eventName: "",
        host: "",
        image: "",
        eventType: "public",
      });
      setImageFile(null);
      setFormError(null);
    } catch (error) {
      console.error("Error: ", error);
      setFormError("Error submitting form. Try again later.");
    } finally {
      setUploading(false);
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
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="eventType">Event Type:</label>
          <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        <button type="submit" disabled={uploading}>
          Submit
        </button>
      </form>
      {uploading && <p>Uploading Image...</p>}
    </div>
  );
};

export default EventModal;
