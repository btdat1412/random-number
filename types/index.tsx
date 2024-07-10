export interface User {
    id: string;
    role: string;
    name: string;
    email: string;
    publicKey: string;
    privateKey: string;
}

export interface Session {
    user: User & {
        id: string;
        role: string;
        name: string;
        email: string;
        publicKey: string;
        privateKey: string;
    };
    token: {
        id: string;
        role: string;
        name: string;
        email: string;
        publicKey: string;
        privateKey: string;
    };
}

export interface Room {
    id: number;
    name: string;
    minimumBet: number;
    createdBy: number;
}
