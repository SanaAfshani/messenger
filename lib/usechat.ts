import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { UserData, TypingInfo, Message } from "./types";

import {NEW_CHAT_MESSAGE_EVENT,
       START_TYPING_MESSAGE_EVENT, 
       STOP_TYPING_MESSAGE_EVENT } from './eventconst';

export default function useChat(chatId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<any[]>([]);
    const [user, setUser] = useState<UserData>(
        {
            name:"sana afshani",
            picture:"/assets/images/logo.png"
        }
    );
    const socketRef = useRef<any>();

    useEffect(() => {
        const fetchMessages = async () => {
          const response = await axios.get(
            `/api/chats/${chatId}/messages`
          );
          const result = response.data.messages;
          setMessages(result);
        };
    
        fetchMessages();
    }, [chatId]);
    
    useEffect(() => {
        if (!user) {
          return;
        }
        fetch('/api/socketio').finally(() => {
            socketRef.current = io({
                query: { chatId, name: user.name, picture: user.picture }
            });
                      
            socketRef.current.on("connect", () => {
                console.log(socketRef.current.id);
            });
          
            socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
                const incomingMessage = {
                  ...message,
                  ownedByCurrentUser: message.senderId === socketRef.current.id,
                };
                setMessages((messages) => [...messages, incomingMessage]);
            });
          
            socketRef.current.on(START_TYPING_MESSAGE_EVENT, (typingInfo: TypingInfo) => {
                if (typingInfo.senderId !== socketRef.current.id) {
                  const user = typingInfo.user;
                  setTypingUsers((users) => [...users, user]);
                }
            });
          
            socketRef.current.on(STOP_TYPING_MESSAGE_EVENT, (typingInfo: TypingInfo) => {
                if (typingInfo.senderId !== socketRef.current.id) {
                  const user = typingInfo.user;
                  setTypingUsers((users) => users.filter((u) => u.name !== user.name));
                }
            });
          
            return () => {
                socketRef.current.disconnect();
            };
        });    
    }, [chatId, user]);

    const sendMessage = (messageBody: string) => {
        if (!socketRef.current) return;
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
          body: messageBody,
          senderId: socketRef.current.id,
          user: user,
        });
    };
    
    const startTypingMessage = () => {
        if (!socketRef.current) return;
        socketRef.current.emit(START_TYPING_MESSAGE_EVENT, {
          senderId: socketRef.current.id,
          user,
        });
    };
    
    const stopTypingMessage = () => {
        if (!socketRef.current) return;
        socketRef.current.emit(STOP_TYPING_MESSAGE_EVENT, {
          senderId: socketRef.current.id,
          user,
        });
    };

    return {
        messages,
        user,
        typingUsers,
        sendMessage,
        startTypingMessage,
        stopTypingMessage,
    };
}      