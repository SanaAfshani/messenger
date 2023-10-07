import React from 'react';
import {Chat} from "@/lib/types";
import ChatListItem from "@/components/chats/Chatlist";
import styles from './chats.module.scss'
import Icon from "@/components/icons/Icons";

interface ChatListProps {
    chats: Chat[];
    setChatId: ()=>void;
    setNewChat: ()=>void;
}

const ChatList: React.FC<ChatListProps> = ({ chats,setChatId, setNewChat }) => {
    return (
        <>
            <div className={styles['chat-list']}>
                {chats.map((chat) => (
                    <ChatListItem key={chat.id} chat={chat} setChatId={setChatId} />
                ))}
            </div>
            <button className={styles['new-chat']} onClick={()=>{setNewChat(true)
                setChatId('2')}}>
                <Icon type='plus' className='text-white text-24' />
            </button>
        </>

    );
};

export default ChatList;
