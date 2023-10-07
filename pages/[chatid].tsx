// @ts-nocheck
import React, { useEffect, useState, useRef, FormEvent } from "react";
import useChat from "@/lib/usechat";
import ChatMessage from "@/components/chatmessage";
import useTyping from "@/lib/usetyping";
import NewMessageForm from "@/components/newmessageform";
import TypingMessage from "@/components/typingmessage";
import styles from '@/styles/chatroom.module.scss';
import UserAvatar from "@/components/user/useravatar";
import BackToBottomButton from "@/components/backToBottomButton/BackToBottomButton";
import Icon from "@/components/icons/Icons";
import ChatComponent from "@/components/chat/Chat";
import useKeepScrollPosition from "@/hooks/useKeepScrollPosition";


export default function Chat({chatId,newChat} : {chatId:string,newChat:boolean}) {
    const {
        messages,
        user,
        typingUsers,
        sendMessage,
        startTypingMessage,
        stopTypingMessage,
    } = useChat(chatId as string);
    const [newMessage, setNewMessage] = useState("");
    const [timeDiff, setTimeDiff] = useState(0);
    const scrollTarget = useRef(null);
    const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
    const [showBackToBottom, setShowBackToBottom] = useState(false);
    const {containerRef} = useKeepScrollPosition([messages]);


    useEffect(() => {
        const response = fetch('/api/currenttime')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTimeDiff(Date.now() - data.current);
            })
            .catch((error) => {
                //---
            })
    },[]);

    const handleNewMessageChange = (event: FormEvent<HTMLInputElement>) => {
        setNewMessage(event.currentTarget.value.replace(/<\/?[^>]*>/g, ""));
    };

    const handleSendMessage = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        cancelTyping();
        sendMessage(newMessage);
        setNewMessage("");
    };

    useEffect(() => {
        if (isTyping) startTypingMessage();
        else stopTypingMessage();
    }, [isTyping]);

    useEffect(() => {
        // If the component has not been rendered yet, scrollTarget.current will be null
        if (scrollTarget.current) {
            (scrollTarget.current as any).scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length + typingUsers.length]);

    const handleChatScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        if (scrollTop < scrollHeight - clientHeight) {
            setShowBackToBottom(true);
        } else {
            setShowBackToBottom(false);
        }
    };

    const handleBackToBottomClick = () => {
        const container = containerRef.current;

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });

            setShowBackToBottom(false);
        }
    };

    useEffect(() => {
        containerRef.current.addEventListener("scroll", handleChatScroll);
        return () => {
            containerRef.current.removeEventListener("scroll", handleChatScroll);
        };
    }, []);


    return (
        <>
            <div className={styles.chatRoomContainer}  ref={containerRef}>
                <div className={styles.chatRoomTopBar}>
                    <div className='d-flex align-items-center p-20'>
                        <a href='/' className='text-decoration-none'>
                            <Icon type='left' className='text-white mr-8' />
                        </a>
                        {user && <UserAvatar user={user}></UserAvatar>}
                        <span className='text-white text-16 ml-8'>{user?.name}</span>
                    </div>
                </div>
                {newChat ? (
                        <div className={styles.messagesContainer}>
                        <ol className={styles.messagesList}>
                        {messages.map((message, i) => {
                            message.sentAt += timeDiff;
                            return (
                                <li key={i}>
                                    <ChatMessage message={message}></ChatMessage>
                                </li>
                            );})}
                        {typingUsers.map((user, i) => (
                            <li key={messages.length + i}>
                                <TypingMessage user={user}></TypingMessage>
                            </li>
                        ))}
                    </ol>
                    <div ref={scrollTarget}></div>
                </div>
                ) : (
                    <ChatComponent chatId={chatId} allMessages={messages} timeDiff={timeDiff} scrollTarget={scrollTarget} typingUsers={typingUsers} />

                )}
                <NewMessageForm
                    newMessage={newMessage}
                    handleNewMessageChange={handleNewMessageChange}
                    handleStartTyping={startTyping}
                    handleStopTyping={stopTyping}
                    handleSendMessage={handleSendMessage}
                ></NewMessageForm>
            </div>
            <div className={styles['position-relative']}>
                {showBackToBottom && <BackToBottomButton onclick={handleBackToBottomClick}/>}
            </div>
        </>
    );


}    