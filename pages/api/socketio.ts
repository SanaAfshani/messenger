import { Server } from 'socket.io';
import { addUser } from '@/lib/users'
import { addMessage } from '@/lib/messages';
import {NEW_CHAT_MESSAGE_EVENT,
         START_TYPING_MESSAGE_EVENT, 
         STOP_TYPING_MESSAGE_EVENT } from '@/lib/eventconst';
import type { NextApiRequest, NextApiResponse } from 'next';

function ioHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!(res.socket as any).server.io) {
        console.log('*First use, starting socket.io');
    
        const io = new Server((res.socket as any).server);
        
        io.on('connection', socket => {
          console.log(`${socket.id} connected`);

          const { chatId, name, picture } = socket.handshake.query;
          socket.join(chatId as string);

          const user = addUser(socket.id, chatId as string, name as string, picture as string);
        
          socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
            const message = addMessage(chatId as string, data);
            io.in(chatId as string).emit(NEW_CHAT_MESSAGE_EVENT, message);
          });

          socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
            io.in(chatId as string).emit(START_TYPING_MESSAGE_EVENT, data);
          });
          socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
            io.in(chatId as string).emit(STOP_TYPING_MESSAGE_EVENT, data);
          });

        });
    
        (res.socket as any).server.io = io;
    } else {
        console.log('socket.io already running');
    }
    res.end();
}

export const config = {
    api: {
      bodyParser: false
    }
}

export default ioHandler;
