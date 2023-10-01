import { createContext, useState, ReactNode, useEffect } from "react";
import { NotOk, User } from "../@types";
import { useNavigate } from "react-router-dom";

interface DefaultValue {
	user: null | User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (
		email: string,
		password: string,
		username: string,
		avatar: File | null
	) => Promise<void>;
}

interface RegisterResult {
	user: User;
	token: string;
}

interface LoginResult {
	verified: boolean;
	token: string;
	user: User;
}

const initialValue: DefaultValue = {
	user: null,
	setUser: () => {
		throw new Error("context not implemented.");
	},
	login: () => {
		throw new Error("context not implemented.");
	},
	logout: () => {
		throw new Error("context not implemented.");
	},
	register: () => {
		throw new Error("context not implemented.");
	},
};
export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const [user, setUser] = useState<null | User>(null);
	const redirect = useNavigate();

	const login = async (email: string, password: string) => {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		const urlencoded = new URLSearchParams();
		urlencoded.append("email", email);
		urlencoded.append("password", password);
		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
		};
		try {
			const response = await fetch(`${baseURL}api/users/login`, requestOptions);
			if (!response.ok) {
				const result = (await response.json()) as NotOk;
				alert(result.error);
			} else {
				const result = (await response.json()) as LoginResult;
				console.log(result);
				setUser(result.user);
				localStorage.setItem("token", result.token);
				localStorage.setItem("user", JSON.stringify(result.user));
				alert("login successful!");
				redirect("/");
				setTimeout(() => redirect("/"), 2000);
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const register = async (
		email: string,
		password: string,
		username: string,
		avatar: File | null
	) => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		if (avatar) {
			formData.append("image_url", avatar);
		}
		const requestOptions = {
			method: "POST",
			body: formData,
		};
		try {
			const response = await fetch(`${baseURL}api/users/new`, requestOptions);
			if (response.ok) {
				const result = (await response.json()) as RegisterResult;
				const { token } = result as RegisterResult;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(result.user));
				alert("Signup Successful, logging in...");
				setUser(result.user);
				setTimeout(() => redirect("/"), 2000);
			} else {
				const result = (await response.json()) as NotOk;
				alert(`Something went wrong - ${result.error}`);
			}
		} catch (e) {
			alert(` ${e as Error}`);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
		alert("logout successful");
		redirect("/");
	};

	const getActiveUser = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const myHeaders = new Headers();
				myHeaders.append("Authorization", `Bearer ${token}`);
				const requestOptions = {
					method: "GET",
					headers: myHeaders,
				};
				const response = await fetch(`${baseURL}api/users/me`, requestOptions);
				const result = (await response.json()) as User;
				setUser(result);
				console.log("active user", result);
			} catch (error) {
				console.log(error);
			}
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		getActiveUser().catch((e) => console.log(e));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};

