import { useState, FormEvent } from "react";
import { NotOk, User, Users } from "../@types";
import { useNavigate } from "react-router-dom";

// needs updating for Firebase functionality!

function CreateUserForm({
	setUsers,
	users,
}: {
	users: Users;
	setUsers: React.Dispatch<React.SetStateAction<Users>>;
}) {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const redirect = useNavigate();

	const createUser = async () => {
		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		formData.append("username", username);
		if (avatarFile) {
			formData.append("image", avatarFile);
		}
		const requestOptions = {
			method: "POST",
			body: formData,
		};
		try {
			const response = await fetch(`${baseURL}api/users/new`, requestOptions);
			console.log(response);
			if (response.ok) {
				const result = (await response.json()) as User;
				alert("user created!");
				setUsers([...users, { ...result }]);
			} else {
				const result = (await response.json()) as NotOk;
				alert(result.error);
			}
		} catch (e) {
			console.log(e);
			const { message } = e as Error;
			alert(message);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ email, username, password });
		createUser().catch((e) => console.log(e)); // found this as an alternative to disabling eslint rule
	};

	return (
		<form onSubmit={handleSubmit}>
			<h3>Create new User:</h3>
			<input
				type="email"
				value={email}
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
			/>{" "}
			<br></br>
			<input
				type="username"
				value={username}
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
			/>{" "}
			<br></br>
			<input
				type="password"
				value={password}
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>{" "}
			<br></br>
			<input
				type="file"
				onChange={(e) => {
					e.target.files && setAvatarFile(e.target.files[0]);
				}}
			/>
			<br></br>
			<button onClick={() => redirect("/profile")}>Register</button>
		</form>
	);
}

export default CreateUserForm;
