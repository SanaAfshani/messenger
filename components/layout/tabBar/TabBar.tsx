import React, { useState } from 'react';
import styles from  './tabBar.module.scss'
import Icon from "@/components/icons/Icons";

interface TabBarProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
}
const HeaderTabBar: React.FC<TabBarProps> = ({activeTab,onTabClick}) => {


    return (
        <div className={styles.headerTabBar}>
            <div className={styles.searchBox}>
                <input type="text" placeholder="Search by name, number..." />
                <div className={styles.circleSearchBox}>J</div>
                <Icon type='search' className={styles.searchIcon} />
            </div>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'chats' ? `${styles.active}` : ''}`}
                    onClick={() => onTabClick('chats')}
                >
                    Chats
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'calls' ? `${styles.active}` : ''}`}
                    onClick={() => onTabClick('calls')}
                >
                    Calls
                </button>
            </div>
        </div>
    );
};

export default HeaderTabBar;
