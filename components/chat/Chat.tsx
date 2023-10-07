import React, {useEffect, useState} from 'react';
import useMessages from "@/hooks/useMessages";
import useKeepScrollPosition from "@/hooks/useKeepScrollPosition";
import styles from './chat.module.scss';
import BackToBottomButton from "@/components/backToBottomButton/BackToBottomButton";
import MessageList from "@/components/MessageList";
import styled from '@/styles/chatmessage.module.scss';
import ChatMessage from "@/components/chatmessage";
import TypingMessage from "@/components/typingmessage";

const ChatComponent = ({chatId , allMessages, typingUsers, timeDiff,scrollTarget }) => {
    const {messages, setLastMessageRef,setMessages} = useMessages();
    const {containerRef} = useKeepScrollPosition([messages]);

    const [showBackToBottom, setShowBackToBottom] = useState(false);

    useEffect(() => {
        if (showBackToBottom) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [showBackToBottom]);

    const handleBackToBottomClick = () => {
        setShowBackToBottom(false);
        const container = containerRef.current;

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (allMessages) {
            setMessages((prevMessages) => [...prevMessages, ...allMessages]);
        }
    }, [allMessages]);



    const handleChatScroll = () => {
        const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
        let scroll = Math.ceil(scrollTop)
        if (scroll < scrollHeight - clientHeight) {
            setShowBackToBottom(true);
        } else if (scroll === (scrollHeight - clientHeight)) {
            setShowBackToBottom(false);
        }
    };

    const sentDate = new Date();
    const hour = sentDate.getHours();
    const minute = sentDate.getMinutes();
    const formattedTime = `${hour?.toString().padStart(2, '0')}:${minute
        ?.toString()
        .padStart(2, '0')}`;


    return (
        <>
            <div className={styles.chat} ref={containerRef} onScroll={handleChatScroll}>
                {messages.map((m, i) => {
                    return(
                        <div
                            key={m.id}
                            className={`${styles.message} ${m.in ? `${styles['message--in']}` : `${styles['message--out']}`}`}
                        >
                            <div ref={(ref) => (i === 0 ? setLastMessageRef(ref) : null)}>
                                <ChatMessage message={m}></ChatMessage>
                            </div>
                        </div>
                        )
                })}
                        {typingUsers.map((user, i) => (
                            <div key={allMessages.length + i}>
                                <TypingMessage user={user}></TypingMessage>
                            </div>
                        ))}
                <div ref={scrollTarget}></div>
            </div>
            <div className={styles['position-relative']}>
                {showBackToBottom && <BackToBottomButton onclick={handleBackToBottomClick}/>}
            </div>
        </>
    );
};

export default ChatComponent;
