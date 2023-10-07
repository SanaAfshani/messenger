import { v4 as uuidv4 } from 'uuid';
import { Message, MessageData } from "./types";

const messages: Message[] = [];

export const addMessage = (chatId: string, message: MessageData) => {
  const msg = { id: uuidv4(), chatId, ...message, sentAt: Date.now() };
  messages.push(<Message>msg);
  return msg;
};

export const getMessagesInChat = (chatId: string) =>
  messages.filter((message) => message.chatId === chatId);

