import { useState } from "react";

import { Link } from "react-router-dom";
import CreateUserForm from "../components/CreateUserForm";
import { Users } from "../@types";

// NEEDS FIREBASE FUNCTIONALITY

function Register() {
	const [users, setUsers] = useState<Users>([]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1em",
			}}>
			<h1>Register</h1>

			<CreateUserForm setUsers={setUsers} users={users} />

			<p>
				Already have an account?{" "}
				<Link to={"/login"} replace={true}>
					Login
				</Link>
				!
			</p>
		</div>
	);
}

export default Register;
