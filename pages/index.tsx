import {useState} from "react";
import Layout from "@/components/layout/Layout";
import Chats from "@/components/chats/Chats";
import {chats} from "@/mock/mockData";
import Chat from "@/pages/[chatid]";

export default function Home() {
  const [chatId, setChatId] = useState('');
  const [newChat,setNewChat]=useState(false)

  if(chatId){
    return (
        <Chat chatId={chatId} newChat={newChat} />
    )
  }else
    return (
        <Layout>
          {!chatId &&(<Chats chats={chats} setChatId={setChatId} setNewChat={setNewChat} />)}
        </Layout>
    );
}
