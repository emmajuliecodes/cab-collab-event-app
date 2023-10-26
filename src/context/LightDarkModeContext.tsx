import { createContext, useContext, useState, ReactNode } from "react";
import { LightDarkModeContextType } from "../@types";

interface LightDarkModeProviderProps {
	children: ReactNode;
}

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

export function LightDarkModeProvider({
	children,
}: LightDarkModeProviderProps) {
	const [isLightMode, setIsLightMode] = useState(false);

	const toggleMode = () => {
		const newMode = !isLightMode;
		setIsLightMode(newMode);
	};

	return (
		<LightDarkModeContext.Provider value={{ isLightMode, toggleMode }}>
			<div className={isLightMode ? "light" : "dark"}>{children}</div>
		</LightDarkModeContext.Provider>
	);
}
