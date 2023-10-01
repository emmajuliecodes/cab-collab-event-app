import Nav from "../Nav";

type Props = {
	children: React.ReactNode;
};

const WithNav = (props: Props) => {
	return (
		<>
			<Nav />
			{props.children}
		</>
	);
};

export default WithNav;
