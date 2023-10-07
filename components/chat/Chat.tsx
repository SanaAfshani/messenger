// @ts-nocheck
import React, { useEffect, useState, RefObject } from 'react';
import useMessages from "@/hooks/useMessages";
import styles from './chat.module.scss';
import BackToBottomButton from "@/components/backToBottomButton/BackToBottomButton";
import ChatMessage from "@/components/chatmessage";
import TypingMessage from "@/components/typingmessage";
import {Message, TypingInfo} from "@/lib/types";
import useKeepScrollPosition from "@/hooks/useKeepScrollPosition";

interface ChatComponentProps {
    allMessages: Message[];
    typingUsers: TypingInfo[];
    scrollTarget: RefObject<HTMLElement>;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ allMessages, typingUsers, scrollTarget }) => {
    const { messages, setLastMessageRef, setMessages } = useMessages();
    const { containerRef } = useKeepScrollPosition([messages]);

    const [showBackToBottom, setShowBackToBottom] = useState(false);

    useEffect(() => {
        if (showBackToBottom) {
            containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
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
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current!;
        let scroll = Math.ceil(scrollTop);
        if (scroll < scrollHeight - clientHeight) {
            setShowBackToBottom(true);
        } else if (scroll === scrollHeight - clientHeight) {
            setShowBackToBottom(false);
        }
    };


    return (
        <>
            <div className={styles.chat} ref={containerRef} onScroll={handleChatScroll}>
                {messages.map((m, i) => (
                    <div
                        key={m.id}
                        className={`${styles.message} ${m.in ? `${styles['message--in']}` : `${styles['message--out']}`}`}
                    >
                        <div ref={(ref) => (i === 0 ? setLastMessageRef(ref) : null)}>
                            <ChatMessage message={m}></ChatMessage>
                        </div>
                    </div>
                ))}
                {typingUsers.map((user, i) => (
                    <div key={allMessages.length + i}>
                        <TypingMessage user={user}></TypingMessage>
                    </div>
                ))}
                <div ref={scrollTarget}></div>
            </div>
            <div className={styles['position-relative']}>
                {showBackToBottom && <BackToBottomButton onClick={handleBackToBottomClick} />}
            </div>
        </>
    );
};

export default ChatComponent;
