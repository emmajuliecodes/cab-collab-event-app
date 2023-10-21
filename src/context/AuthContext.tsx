import { createContext, useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
	type User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";

interface ContextType {
	user: User | null;
	handleLogin: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => void;
	logout: () => void;
	handleRegister: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string,
		name: string
	) => void;
	// handleUpdate: (e: FormEvent<HTMLFormElement>, name: string) => void;
	isChecked: boolean;
}

const defaultValue: ContextType = {
	user: null,
	handleLogin: () => {
		throw Error("No provider");
	},
	logout: () => {
		throw Error("No provider");
	},
	handleRegister: () => {
		throw Error("No provider");
	},
	// handleUpdate: () => {
	// 	throw Error("context not implemented.");
	// },

	isChecked: false,
};

export const AuthContext = createContext(defaultValue);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate();

	const logout = () => {
		signOut(auth)
			.then(() => {
				setUser(null);
				toast.info("logged out");
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};

	const handleRegister = (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
		// name: string
	) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
				console.log("new user", user);

				const uid = user.uid;
				addDoc(collection(db, "users"), {
					email: user.email,
					uid: uid,
					name: "",
				});

				const updateUser = doc(db, "users", "id");

				updateDoc(updateUser, {
					name: "",
				});

				toast.success("Success, you are registered");
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				console.log(error);
			});
	};

	// async function handleUpdate() {
	// 	try {
	// 		const updateUser = doc(db, "users", "id");

	// 		await updateDoc(updateUser, {
	// 			name: "",
	// 		});
	// 		toast.success("Success, you have a name");
	// 		navigate("/");
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 	}
	// }

	const handleLogin = (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
				console.log(user);
				toast.success("Success, you are logged in");
				navigate("/");
				// ...
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				console.log(error);
			});
	};

	const checkActiveUser = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				// const uid = user.uid;
				setUser(user);
				console.log(user, "user");
				// ...
			} else {
				setUser(null);
				// User is signed out
				// ...
			}
			setIsChecked(true);
		});
	};

	useEffect(() => {
		checkActiveUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				handleLogin,
				logout,
				handleRegister,

				isChecked,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};
