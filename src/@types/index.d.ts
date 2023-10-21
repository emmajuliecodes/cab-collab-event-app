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
	description: Array[];
	eventName: string;
	host: string | User;
	map_location: Location;
	street_address: Location;
	image: string;
	public: boolean;
	creator_id: string;
}

// public or private - true fales - use for My Events

export type Users = User[];
