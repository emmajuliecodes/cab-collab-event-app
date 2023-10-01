import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await login(email, password);
	};

	const formStyle: React.CSSProperties = {
		border: "solid black 1px",
		width: "350px",
		padding: "1em",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "1em",
	};

	const displayCenter: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "1em",
	};

	return (
		<div style={displayCenter}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit} style={displayCenter}>
				<div style={formStyle}>
					<label>Enter your email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />
					<label>Enter your password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
