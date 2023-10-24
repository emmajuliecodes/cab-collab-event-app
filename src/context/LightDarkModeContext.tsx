import { createContext, useContext, useState, ReactNode } from "react";
import { LightDarkModeContextType } from "../@types";

const LightDarkModeContext = createContext<
	LightDarkModeContextType | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useLightDarkMode() {
	const context = useContext(LightDarkModeContext);
	if (!context) {
		throw new Error(
			"useLightDarkMode must be used within a LightDarkModeProvider"
		);
	}
	return context;
}

interface LightDarkModeProviderProps {
	children: ReactNode;
}

export function LightDarkModeProvider({
	children,
}: LightDarkModeProviderProps) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);

		// Update CSS variables based on the mode
		document.documentElement.style.setProperty(
			"--background-light",
			newMode ? "black" : "white"
		);
		document.documentElement.style.setProperty(
			"--background-dark",
			newMode ? "white" : "black"
		);
		document.documentElement.style.setProperty(
			"--text-light",
			newMode ? "white" : "black"
		);
		document.documentElement.style.setProperty(
			"--text-dark",
			newMode ? "black" : "white"
		);
	};

	return (
		<LightDarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
			<div className={isDarkMode ? "dark" : "light"}>{children}</div>
		</LightDarkModeContext.Provider>
	);
}
