import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, addDoc, doc, updateDoc, query, getDocs, arrayUnion } from "firebase/firestore";
import {
	getStorage,
	ref,
	// uploadBytesResumable,
	getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import {} from "firebase/database";
// import Checkbox from "@mui/material/Checkbox";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { UserProfileData } from "../@types";
import { AuthContext } from "../context/AuthContext";
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EventForm: React.FC = () => {

  const {user, userData} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    invitees: "",
    location: "",
    description: "",
    eventName: "",
    eventType: "public",
  });
  const [users, setUsers] = useState<UserProfileData[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormError("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageAndGetURL = async (imageFile: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + imageFile.name);
    try {
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url ? url : "https://firebasestorage.googleapis.com/v0/b/cab-collab-event-app.appspot.com/o/images%2Fplaceholder.png?alt=media"
    } catch (e) {
      console.log(e);
      return "https://firebasestorage.googleapis.com/v0/b/cab-collab-event-app.appspot.com/o/images%2Fplaceholder.png?alt=media"
    }
    // I also didn't understand this, so just did it how I know for now
    // const uploadTask = uploadBytesResumable(storageRef, imageFile);
    // return new Promise<string | null>((resolve, reject) => {
    //   uploadTask.on(
    //     "state_changed",
    //     () => {},
    //     (error) => reject(error),
    //     async () => {
    //       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    //       resolve(downloadURL);
    //     }
    //   );
    // });
  };

  const startEndLogic = (startingTime: Date, endingTime: Date): boolean => {
    if (startingTime >= endingTime) {
      setFormError("End time must be later than start time");
      setUploading(false);
      return false
    }
    return true
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!user || !userData) return setFormError("Must be logged in to create event");
    const startTime = new Date(`1970-01-01T${formData.startTime}Z`);
    const endTime = new Date(`1970-01-01T${formData.endTime}Z`);
    const validTimes = startEndLogic(startTime, endTime);
    if (!validTimes) return;

    setUploading(true);
    const imageUrl = imageFile ? await uploadImageAndGetURL(imageFile) : "https://firebasestorage.googleapis.com/v0/b/cab-collab-event-app.appspot.com/o/images%2Fplaceholder.png?alt=media"
    setUploading(false);

    try {
      const newEvent = {
        ...formData,
        invitees: selectedUsers, // Set the invitees field with the IDs
        image: imageUrl,
        host: userData.name
      };
      console.log("new Event", newEvent);
      const docRef = await addDoc(collection(db, "events"), newEvent);
      console.log(docRef.id);

      // Update each selected user's 'pendingInvites' with the new event's ID.
      selectedUsers.forEach(async(su) => {
        const q = doc(db, "users", su);
        await updateDoc(q, {
          invites: arrayUnion(docRef.id)
        });
      })
      // Update user's myEvents array with new event's ID.
      const q = doc(db, "users", user.uid);
      await updateDoc(q, {
        myEvents: arrayUnion(docRef.id)
      })
        
      // for (const user of selectedUsers) {
      //   const userDoc = doc(db, "users", user.id);
      //   const userSnapshot = await getDoc(userDoc);
      //   if (userSnapshot.exists()) {
      //     const userData = userSnapshot.data() as UserProfileData;
      //     const currentPendingInvites = userData.invites || []; // Default to an empty array if undefined
      //     const updatedPendingInvites = [...currentPendingInvites, docRef.id];
      //     await updateDoc(userDoc, { pendingInvites: updatedPendingInvites });
      //   }
      // }

      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        invitees: "",
        location: "",
        description: "",
        eventName: "",
        eventType: "public",
      });
      const allCheckboxes:NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]');
      allCheckboxes.forEach((cb) => cb.checked = false);
      setImageFile(null);
      setFormError("");
    } catch (error) {
      console.error("Error: ", error);
      setFormError("Error submitting form. Try again later.");
    }
  };

  useEffect(() => {
    const getAllUsers = async() => {
      if (!user) return;
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const allUsers: UserProfileData[] = [];
        querySnapshot.forEach((doc) => {
          const aUser = doc.data() as UserProfileData;
          allUsers.push(aUser);
        });
        setUsers(allUsers.filter((u) => u.uid !== user.uid));
      } catch (e) {
        console.log(e)
      }
    }
    getAllUsers();
  }, [user]);

  if (!user) return <p>You must be logged in create an event</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <form onSubmit={handleSubmit} style={{ width: "250px", margin: "1em" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
        
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />

          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />

          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />

          <label htmlFor="eventName">Event Name:</label>
					<input
						type="text"
						id="eventName"
						name="eventName"
						value={formData.eventName}
						onChange={handleChange}
					/>

          <label htmlFor="location">Location:</label>
					<input
						type="text"
						id="location"
						name="location"
						value={formData.location}
						onChange={handleChange}
					/>

          <label htmlFor="description">Description:</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>

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

          <label htmlFor="eventType">Event Type:</label>
					<select
						id="eventType"
						name="eventType"
						value={formData.eventType}
						onChange={handleChange}>
						<option value="public">Public</option>
						<option value="private">Private</option>
					</select>

        <div style={{ gridColumn: "span 2", margin: "1em", display: "flex", flexDirection: "column", height: "100px", overflowY: "scroll", gap: "0.5em", alignItems: "flex-start" }}>
        <u>Invite your friends:</u>
          { users.length === 0 && <p>Nigel No Friends 😞</p> }
          { users.map((u) => {
            return <label key={u.uid}><input type="checkbox" value={u.uid} onChange={(e) => {
              e.target.checked ? 
                setSelectedUsers([...selectedUsers, u.uid]) : 
                setSelectedUsers(selectedUsers.filter((su) => su !== u.uid));
            }}/>{u.name}</label>
          }) }
          {/* 
          I'm sorry, I didn't understand how this works so I just made checkboxes
          <Autocomplete
            multiple
            id="invitees-emails"
            options={users || []}
            value={selectedUsers}
            onChange={(e, newValue) => {
              setSelectedUsers([...selectedUsers, newValue]);
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => option.email}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.email}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Invitees" placeholder="Search by email" />}
          /> */}
          {/* <label htmlFor="invitees">Invitees:</label>

          <input type="text" id="invitees" name="invitees" value={formData.invitees} onChange={handleChange} /> */}
				</div>
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

export default EventForm;
