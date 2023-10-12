// src/services/useFirebaseStorage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const storage = getStorage(app);

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Creating a reference to the file in Firebase Storage
    const storageRef = ref(storage, `images/${file.name}`);

    // Uploading the file and obtaining a snapshot of the uploaded file
    await uploadBytes(storageRef, file);

    // Obtaining the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    // Handling errors, such as failed uploads
    console.error("Error uploading image:", error);
    throw error;
  }
};
