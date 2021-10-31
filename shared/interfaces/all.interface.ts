export interface IMatch {
    uid: string;
    date: string;
    duration: number; // minutes
    location_latitude?: ILocation;
    location_logitude?: ILocation;
    locationAdress?: string
    locationName?: string;
    price?: number;
    players?: string[];
    maxPlayers: number;
    level: number; 
    type: number; 
    ambiance?: number;
}

export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IUsers {
    uid: string;
    name: string;
    age: number;
    email: string;
    matchPlayed?: number; // 0 default
    goalScored?: number; // 0 default
    foot?: number; // 0 -> left footed and 1 -> right
    preferedPosition: number;
    pictureUrl?: string;
}

// name
// age
// matchPlayed? // 0 default
// goalScored? // 0 default
// foot? // 0 -> left footed and 1 -> right
// preferedPosition
// pictureUrl?