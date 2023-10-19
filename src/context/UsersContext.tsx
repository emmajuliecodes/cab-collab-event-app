import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

interface FirebaseUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  attending: string[];
  declined: string[];
  invites: string[];
  uid: string;
}

interface ContextType {
  user: User | null;
  users: FirebaseUser[] | undefined;
  getAllUsers: () => void;
  handleAddUserToEvent: () => void;
  handleRemoveUserFromEvent: () => void;
}

const defaultValue: ContextType = {
  user: null,
  users: undefined,
  getAllUsers: () => {
    throw Error("No provider");
  },
  handleAddUserToEvent: () => {
    throw Error("No provider");
  },
  handleRemoveUserFromEvent: () => {
    throw Error("No provider");
  },
};

export const UsersContext = createContext(defaultValue);

interface Props {
  children: React.ReactNode;
}

export const UsersContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<FirebaseUser[] | undefined>(undefined);

  const getAllUsers = async () => {
    const userRef = collection(db, "users"); // "users" is the name of the collection
    const userSnapshot = await getDocs(userRef);
    const usersFirebase: FirebaseUser[] = userSnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        city: data.city || "",
        attending: data.attending || [],
        declined: data.declined || [],
        invites: data.invites || [],
        uid: data.uid || "",
      };
    });
    console.log(usersFirebase);
    setUsers(usersFirebase);
  };

  const handleAddUserToEvent = () => {};

  const handleRemoveUserFromEvent = () => {};

  return <UsersContext.Provider value={{ user, getAllUsers, users, handleAddUserToEvent, handleRemoveUserFromEvent }}>{props.children}</UsersContext.Provider>;
};
