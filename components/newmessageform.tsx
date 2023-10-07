import { FormEvent } from "react";
import styles from '@/styles/newmessageform.module.scss';
import Icon from "@/components/icons/Icons";

interface PropsType {
  newMessage: string;
  handleNewMessageChange: (event: FormEvent<HTMLInputElement>) => void;
  handleStartTyping: () => void;
  handleStopTyping: () => void;
  handleSendMessage: (event: any) => void;
}

const NewMessageForm = ({
    newMessage,
    handleNewMessageChange,
    handleStartTyping,
    handleStopTyping,
    handleSendMessage,
}: PropsType) => {
    return (
      <form className={styles.newMessageForm}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Message"
          className={styles.newMessageInputField}
          onKeyPress={handleStartTyping}
          onKeyUp={handleStopTyping}
        />
        <button
          type="submit"
          onClick={handleSendMessage}
          className={styles.sendMessageButton}
        >
          <Icon type='send' />
        </button>
      </form>
    );
};
  
export default NewMessageForm;
  