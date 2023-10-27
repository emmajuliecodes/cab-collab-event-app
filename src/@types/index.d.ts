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

export interface Event {
	date: string;
	time: string;
	eventType: string;
	attendees: Array[];
	invitees: Array[];
	declined: Array[];
	pending: Array[];
	city: string;
	description: string;
	eventName: string;
	host: string | User;

	street_address: string;
	image: string;
	public: boolean;
	creator_id: string;
}

export interface LightDarkModeContextType {
	isLightMode: boolean;
	toggleMode: () => void;
}

export type Users = User[];
