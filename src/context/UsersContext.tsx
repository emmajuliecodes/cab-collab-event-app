import React, { createContext, useState } from "react";
import { User } from "firebase/auth";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

interface FirestoreUserData {
	name?: string;
	phone?: string;
	email?: string;
	city?: string;
	attending?: string[];
	declined?: string[];
	invites?: string[];
	uid?: string;
	pendingInvites: string[];
}
export interface FirebaseUser {
	pendingInvites: string[];
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

export const UsersContextProvider: React.FC<Props> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [users, setUsers] = useState<FirebaseUser[] | undefined>(undefined);

	const transformToFirebaseUser = (
		doc: QueryDocumentSnapshot
	): FirebaseUser => {
		const data = doc.data() as FirestoreUserData; // Cast the data to your custom type
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
			pendingInvites: data.pendingInvites || [],
		};
	};

	const getAllUsers = async () => {
		const userRef = collection(db, "users");
		const userSnapshot = await getDocs(userRef);
		const usersFirebase = userSnapshot.docs.map(transformToFirebaseUser);
		console.log(usersFirebase);
		setUsers(usersFirebase);
	};

	const handleAddUserToEvent = () => {
		// Implementation here
	};

	const handleRemoveUserFromEvent = () => {
		// Implementation here
	};

	return (
		<UsersContext.Provider
			value={{
				user,
				getAllUsers,
				users,
				handleAddUserToEvent,
				handleRemoveUserFromEvent,
			}}>
			{children}
		</UsersContext.Provider>
	);
};

// When user is registered they already are added to the firestore user base, so we don't need to do this here.
// User interface exists in types - we don't need to duplicate here - not sure we're replicating all data on firebase and firestore
// I think we can create this in the existing authcontext file and just call the function with the create event/add invites etc functions
// We have invites and pending invites - is this a duplication?
