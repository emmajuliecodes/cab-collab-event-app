import { useState, type FormEvent } from "react";

type Props = {
	title: string;
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		name: string,
		email: string,
		password: string
	) => void;
};

const AuthRegisterForm = ({ title, handleSubmit }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<div className="FormContainer">
			<h2>{title}</h2>
			<form onSubmit={(e) => handleSubmit(e, name, email, password)}>
				<label htmlFor="name" className="label">
					Name:
				</label>
				<br></br>
				<input
					placeholder="Add your name"
					type="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="InputField"
				/>
				<br></br>

				<label htmlFor="email" className="label">
					Email:
				</label>
				<br></br>
				<input
					placeholder="Add your email"
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="InputField"
				/>
				<br></br>
				<label htmlFor="password" className="label">
					Password:
				</label>
				<br></br>
				<input
					placeholder="Add your password"
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

export default AuthRegisterForm;
