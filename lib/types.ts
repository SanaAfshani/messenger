export interface UserData {
    name: string;
    picture: string;
}

export interface TypingInfo {
    senderId: string;
    user: UserData;
}

export interface MessageData {
    body: string;
    senderId: string;
    user: UserData;
}

export interface Message {
    id: string;
    chatId: string;
    message:string;
    body: string;
    senderId: string;
    user: UserData;
    sentAt: number;
    ownedByCurrentUser?: boolean;
    in: boolean
}

export interface Chat {
    id: number;
    user: {
        name: string;
        image: string;
    };
    latestMessage: string;
}

export interface User {
    id: string;
    chatId?: string;
    name: string;
    picture: string;
}