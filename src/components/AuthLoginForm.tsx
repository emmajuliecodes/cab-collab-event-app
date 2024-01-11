import { useState, type FormEvent } from "react";

type Props = {
	title: string;

	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => void;
};

const AuthLoginForm = ({ title, handleSubmit }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	return (
		<div className="FormContainer">
			<h2>{title}</h2>
			<form onSubmit={(e) => handleSubmit(e, email, password)}>
				<label htmlFor="email" className="label">
					Email
				</label>
				<br></br>
				<input
					placeholder="add your email"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="InputField"
				/>
				<br></br>
				<label htmlFor="password" className="label">
					Password
				</label>
				<br></br>
				<input
					placeholder="add your password"
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="InputField"
				/>
				<br></br>
				<button type="submit" className="submitButton">
					{title}
				</button>
			</form>
		</div>
	);
};

export default AuthLoginForm;
