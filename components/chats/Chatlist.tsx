import React from 'react';
import {Chat} from "@/lib/types";
import styles from './chats.module.scss'
interface ChatListItemProps {
    chat: Chat;
    setChatId: ()=> void
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat,setChatId }) => {
    const { user, latestMessage,id } = chat;

    return (
        <div className={styles['chat-list-item']} onClick={()=>setChatId(id)}>
            <img src={user.image} alt={user.name} className={styles['user-image']} />
            <div className={styles['user-info']}>
                <span className={styles['user-name']}>{user.name}</span>
                <p className={styles['latest-message']}>{latestMessage}</p>
            </div>
        </div>
    );
};

export default ChatListItem;
