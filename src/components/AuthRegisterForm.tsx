import { useState, type FormEvent } from "react";

type Props = {
	title: string;
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string,
		name: string
	) => void;
};

const AuthRegisterForm = ({ title, handleSubmit }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<div>
			<h1>{title}</h1>
			<form onSubmit={(e) => handleSubmit(e, email, password, name)}>
				<label htmlFor="email">Email </label>
				<input
					placeholder="add your email"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br></br>
				<label htmlFor="password">Password </label>
				<input
					placeholder="add your password"
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="name">Name</label>
				<input
					placeholder="add your n"
					id="name"
					type="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br></br>

				<button type="submit">{title}</button>
			</form>
		</div>
	);
};

export default AuthRegisterForm;
