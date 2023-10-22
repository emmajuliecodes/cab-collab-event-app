export interface NotOk {
	error: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	username: string;
	createdAt: string;
	events: Array[];
	avatar: string;
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
	// Location: is a type only used for window.location
	// https://developer.mozilla.org/en-US/docs/Web/API/Location
	// map_location: Location;
	street_address: string;
	image: string;
	public: boolean;
	creator_id: string;
}

// public or private - true fales - use for My Events

export type Users = User[];
