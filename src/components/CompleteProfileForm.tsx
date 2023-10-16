import { useState, type FormEvent } from "react";
type Props = {
	title: string;
	handleSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
};

const UpdateProfile = ({ title, handleSubmit }: Props) => {
	const [name, setName] = useState("");

	return (
		<div>
			<h1>{title}</h1>
			<form onSubmit={(e) => handleSubmit(e, name)}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit">{title}</button>
			</form>
		</div>
	);

	return;
};

export default UpdateProfile;
