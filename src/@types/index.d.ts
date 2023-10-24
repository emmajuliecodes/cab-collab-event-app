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
  attendees: Array[];
  invited: Array[];
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
