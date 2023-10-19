import { useContext } from "react";
import AuthRegisterForm from "../components/AuthRegisterForm";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
	const { handleRegister } = useContext(AuthContext);
	const { handleUpdate } = useContext(AuthContext);

	return (
		<div>
			<AuthRegisterForm title={"Register"} handleSubmit={handleRegister} />
			<UpdateProfileForm
				title={"Complete Profile"}
				handleSubmit={handleUpdate}
			/>
		</div>
	);
};

export default Register;

// Add update profile here as a state that we move to following first submit?
