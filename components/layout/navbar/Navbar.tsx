import React from 'react';
import styles from './Navbar.module.scss';
import Icon from "@/components/icons/Icons";

interface NavbarProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabClick }) => {
    return (
        <div className={styles.navbar}>
            <button
                className={`${styles.navItem} ${activeTab === 'chats' ? styles.active : ''}`}
                onClick={() => onTabClick('chats')}
            >
                <Icon type='chat' className={`${styles.iconSize} ${activeTab === 'chats' ? styles.active : ''}`} />
                Chats
            </button>
            <button
                className={`${styles.navItem} ${activeTab === 'contacts' ? styles.active : ''}`}
                onClick={() => onTabClick('contacts')}
            >
                <Icon type='line'  className={`${styles.iconSize} ${activeTab === 'contacts' ? styles.active : ''}`} />
                Contacts
            </button>
            <button
                className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                onClick={() => onTabClick('settings')}
            >
                <Icon type='settings' className={`${styles.iconSize} ${activeTab === 'settings' ? styles.active : ''}`}/>
                Settings
            </button>
        </div>
    );
};

export default Navbar;
