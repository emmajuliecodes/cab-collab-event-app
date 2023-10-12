import { useContext } from "react";
import AuthForm from "../components/AuthRegisterForm";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
	const { handleRegister } = useContext(AuthContext);

	return (
		<div>
			<AuthForm title={"Register"} handleSubmit={handleRegister} />
		</div>
	);
};

export default Register;
