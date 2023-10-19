// // import { collection } from "firebase/firestore";

// type Props = {
// 	title: string;
// 	handleSubmit: (e: FormEvent<HTMLFormElement>, name: string) => void;
// };

// const UpdateProfileForm = ({ title, handleSubmit }: Props) => {
// 	const [userDataToUpdate, setUserDataToUpdate] = useState({
// 	});
// 	const [documentId] = useState("");

// 	const updateDocument = async () => {
// 		try {
// 			const docRef = firestore.collection("Users").doc(documentId);
// 			await docRef.update({
// 				name: userDataToUpdate,
// 			});
// 			console.log("updated!");
// 		} catch (error) {
// 			console.log(error, "error!");
// 		}
// 	}

// 	return (
// 		<div>
// 			<h1>{title}</h1>
// 			<form onSubmit={(e) => handleSubmit(e, )}>
// 				<label htmlFor="name">Name</label>
// 				<input
// 					id="name"
// 					type="name"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 				/>
// 				<br></br>
// 				<button type="submit">{title}</button>
// 			</form>
// 		</div>
// 	);
// };
// export default UpdateProfileForm;
