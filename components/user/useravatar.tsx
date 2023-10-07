import Image from 'next/image';
import { User, UserData } from '@/lib/types';
import styles from "./useravatar.module.scss";

const UserAvatar = ({ user }: { user: User | UserData}) => {
    return (
      <Image
        src={user.picture}
        alt={user.name}
        title={user.name}
        width={30}
        height={30}
        className={styles.avatar}
      />
    );
  };
  
  export default UserAvatar;
  
