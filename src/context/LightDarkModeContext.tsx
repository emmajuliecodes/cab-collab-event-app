import { createContext, useContext, useState, ReactNode } from "react";
import { LightDarkModeContextType } from "../@types";

// import ink from "../assets/videos/ink.mp4";
// import spacewave from "../assets/videos/spacewave.mp4";

// interface LightDarkModeProviderProps {
// 	children: ReactNode;
// }

export const LightDarkModeContext = createContext<
	LightDarkModeContextType | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function LightDarkMode() {
	const context = useContext(LightDarkModeContext);
	if (!context) {
		throw new Error(
			"useLightDarkMode must be used within a LightDarkModeProvider"
		);
	}
	return context;
}

export const LightDarkModeProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [isLightMode, setIsLightMode] = useState<boolean>(false);

	const toggleMode = () => {
		setIsLightMode((prev) => !prev);
	};

	return (
		<LightDarkModeContext.Provider value={{ isLightMode, toggleMode }}>
			{children}
		</LightDarkModeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLightDarkMode = () => {
	const context = useContext(LightDarkModeContext);
	if (context === undefined) {
		throw new Error("useLightDarkMode must be used within a ThemeProvider");
	}
	return context;
};
