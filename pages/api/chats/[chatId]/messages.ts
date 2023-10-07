import {addMessage, getMessagesInChat} from '@/lib/messages';
import type { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.query,"req.query")
    const { chatId } = req.query;
    try {
        const messages = getMessagesInChat(chatId as string);
        res.status(200).json({messages});
    } catch (err) {    
        res.status(500).end();
    }
}    

export default handler;
