import styles from '@/styles/chatmessage.module.scss';
import { Message } from '@/lib/types';

const ChatMessage = ({ message }: {message: Message}) => {
    const sentDate = new Date(message.sentAt);
    const hour = sentDate.getHours();
    const minute = sentDate.getMinutes();
    const formattedTime = `${hour?.toString().padStart(2, '0')}:${minute
        ?.toString()
        .padStart(2, '0')}`;
    
    return (
      <div
        className={`${styles.messageItem} ${
          message.ownedByCurrentUser ? styles.myMessage : styles.receivedMessage
        }`}
      >
        <div className={styles.messageBodyContainer}>
          <div className={styles.messageBody}>
              <span>{message.body || message.message}</span>
              <span className='text-8 ml-8 white-space-nowrap'>{formattedTime? formattedTime: ''}</span>
          </div>
        </div>
      </div>
    );
};
  
export default ChatMessage;
  