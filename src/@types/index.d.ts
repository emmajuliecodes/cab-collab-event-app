export interface NotOk {
	error: string;
}

export interface UserProfileData {
	name: string;
	phone: string;
	email: string;
	city: string;
	myEvents: string[];
	attending: string[];
	declined: string[];
	invites: string[];
	uid: string;
}
// Event is also an exising Type that represents the trigger of an Event Handler Function
export interface Event {
	id: string;
	date: string;
	endTime: string;
	startTime: string;
	eventType: string;
	attending: string[];
	invitees: string[];
	declined: string[];
	pending: string[];
	city: string;
	description: string;
	eventName: string;
	host: string | User;
	// Location: is a type only used for window.location
	// https://developer.mozilla.org/en-US/docs/Web/API/Location
	// map_location: Location;
	street_address: string;
	image: string;
	public: boolean;
	creator_id: string;
}

export interface LightDarkModeContextType {
	isLightMode: boolean;
	toggleMode: () => void;
}

export type Users = User[""];
