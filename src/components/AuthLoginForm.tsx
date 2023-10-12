import { useState, type FormEvent } from "react";

type Props = {
	title: string;
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => void;
};

const AuthForm = ({ title, handleSubmit }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	return (
		<div>
			<h1>{title}</h1>
			<form onSubmit={(e) => handleSubmit(e, email, password)}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">{title}</button>
			</form>
		</div>
	);
};

export default AuthForm;
