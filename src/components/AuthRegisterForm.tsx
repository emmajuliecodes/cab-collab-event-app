import { useState, type FormEvent } from "react";
// import {
// 	getStorage,
// 	ref,
// 	uploadBytesResumable,
// 	getDownloadURL,
// } from "firebase/storage";

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
	// const [avatar, setAvatar] = useState<File | null>(null);
	// const [uploading, setUploading] = useState(false);

	// const uploadImageAndGetURL = async () => {
	// 	if (!avatar) return null;

	// 	const storage = getStorage();
	// 	const storageRef = ref(storage, "images/" + avatar.file);
	// 	const uploadTask = uploadBytesResumable(storageRef, avatar);

	// 	return new Promise<string | null>((resolve, reject) => {
	// 		uploadTask.on(
	// 			"state_changed",
	// 			() => {},
	// 			(error) => reject(error),
	// 			async () => {
	// 				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
	// 				resolve(downloadURL);
	// 			}
	// 		);
	// 	});
	// };

	// const handleImageSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	let imageUrl = "";
	// 	if (avatar) {
	// 		// Only attempt to upload if there's an image file
	// 		setUploading(true);
	// 		imageUrl = (await uploadImageAndGetURL()) || "";
	// 		setUploading(false);

			return (
				<div>
					<h1>{title}</h1>
					<form onSubmit={(e) => handleSubmit(e, email, password, name)}>
						<label htmlFor="email">Email </label>
						<input
							placeholder="Add your email"
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br></br>
						<label htmlFor="password">Password </label>
						<input
							placeholder="Add your password"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="name">Name</label>
						<input
							placeholder="Add your name"
							id="name"
							type="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<br></br>

						<label htmlFor="avatar">Avatar</label>
						<input
							placeholder="Add your avatar"
							id="avatar"
							type="avatar"
							onChange={(e) => {
								const file = e.target.files ? e.target.files[0] : null;
								setAvatar(file);
							}}
						/>

						<br></br>

						<button type="submit">{title}</button>
					</form>
					{uploading && <p>Uploading avatar image...</p>}
				</div>
			);
		};
	}
	
export default AuthRegisterForm;
