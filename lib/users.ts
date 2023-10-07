import { User } from "./types";

const users: User[] = [];

export const addUser = (id: string, room: string, name: string, picture: string) => {

    const user = { id, name, picture, room };

    users.push(user);

    return { id, name: user.name, picture: user.picture };
};


