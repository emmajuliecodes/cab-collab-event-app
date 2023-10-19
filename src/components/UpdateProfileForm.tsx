import { useState, type FormEvent } from "react";

type Props = {
	title: string;
	handleSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
};
//

const UpdateProfileForm = ({ title, handleSubmit }: Props) => {
	const [name, setName] = useState("");

	return (
		<div>
			<h1>{title}</h1>
			<form onSubmit={(e) => handleSubmit(e, name)}>
				<label htmlFor="name">Name</label>
				<input
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
export default UpdateProfileForm;
