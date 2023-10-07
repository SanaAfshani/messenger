import {Chat} from "@/lib/types";

export const chats: Chat[] = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            image: '/assets/images/logo.png',
        },
        latestMessage: 'Hello there!',
    },{
        id: 2,
        user: {
            name: 'Sana Afshani',
            image: '/assets/images/logo.png',
        },
        latestMessage: 'Hello there!',
    },{
        id: 3,
        user: {
            name: 'test1',
            image: '/assets/images/logo.png',
        },
        latestMessage: 'Hello there!',
    },{
        id: 4,
        user: {
            name: 'test2',
            image: '/assets/images/logo.png',
        },
        latestMessage: 'Hello there!',
    },
    // Add more chat objects as needed
];
