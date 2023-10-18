// import { db } from "../firebase/FirebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";

// import { useState, type FormEvent } from "react";
// type Props = {
// 	title: string;
// 	handleSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
// };

// async function updateProfile() {
// 	try {
// 		const docID = "cy8x8TFqCNRlZl2OujSr";
// 		const updateTest = doc(db, "users", docID);
// 		console.log(docID, "docID");
// 		await updateDoc(updateTest, {
// 			name: "Testing the updates again",
// 		});
// 	} catch (e) {
// 		console.error("Error adding document: ", e);
// 	}
// }

// const UpdateProfile = ({ title, handleSubmit }: Props) => {
//     const [name, setName] = useState("");

// 	return (
// 		<div>
// 			<h1>{title}</h1>
// 			<form onSubmit={(e) => handleSubmit(e, name)}>
// 				<label htmlFor="email">Email</label>
// 				<input
// 					id="email"
// 					type="email"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 				/>
// 				<button type="submit">{title}</button>
// 			</form>
// 		</div>
// 	);

// 	return;
// };

export default UpdateProfile;
