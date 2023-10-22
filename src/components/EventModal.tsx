import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FirebaseUser, UsersContext } from "../context/UsersContext";
import {} from "firebase/database";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EventModal: React.FC = () => {
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

  const { getAllUsers, users } = useContext(UsersContext);
  const [selectedUsers, setSelectedUsers] = useState<FirebaseUser[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
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

  const startEndLogic = (startingTime: Date, endingTime: Date): void => {
    if (startingTime >= endingTime) {
      setFormError("End time must be later than start time");
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startTime = new Date(`1970-01-01T${formData.startTime}Z`);
    const endTime = new Date(`1970-01-01T${formData.endTime}Z`);
    startEndLogic(startTime, endTime);

    let imageUrl = "";
    if (imageFile) {
      // Only attempt to upload if there's an image file
      setUploading(true);
      imageUrl = (await uploadImageAndGetURL()) || "";
      setUploading(false);
    }

    try {
      const newEvent = { ...formData, image: imageUrl };
      const docRef = await addDoc(collection(db, "events"), newEvent);

      // Update each selected user's 'pendingInvites' with the new event's ID.
      for (const user of selectedUsers) {
        const userDoc = doc(db, "users", user.id);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as FirebaseUser;
          const updatedPendingInvites = [...userData.pendingInvites, docRef.id];
          await updateDoc(userDoc, { pendingInvites: updatedPendingInvites });
        }
      }

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
    }
  };

  useEffect(() => {
    getAllUsers();
    console.log("selected", selectedUsers);
  }, [selectedUsers]);

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
          <Autocomplete
            multiple
            id="invitees-emails"
            options={users || []}
            value={selectedUsers}
            onChange={(e, newValue) => {
              setSelectedUsers(newValue);
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => option.email}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Invitees" placeholder="Search by email" />}
          />
          {/* <label htmlFor="invitees">Invitees:</label>
          <input type="text" id="invitees" name="invitees" value={formData.invitees} onChange={handleChange} /> */}
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
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setImageFile(file);
            }}
          />
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
