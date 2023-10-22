import { useContext } from "react";
import AuthRegisterForm from "../components/AuthRegisterForm";

import { AuthContext } from "../context/AuthContext";

const Register = () => {
	const { handleRegister } = useContext(AuthContext);

	return (
		<div>
			<AuthRegisterForm title={"Register"} handleSubmit={handleRegister} />
		</div>
	);
};

export default Register;

// Add update profile here as a state that we move to following first submit?
