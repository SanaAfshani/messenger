import React, {ReactNode, useState} from 'react';
import styles from './layout.module.scss'
import Navbar from "@/components/layout/navbar/Navbar";
import HeaderTabBar from "@/components/layout/tabBar/TabBar";
import EmptyState from "@/components/EmptyState";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [activeTab, setActiveTab] = useState('chats');
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
               <HeaderTabBar  activeTab={activeTab} onTabClick={handleTabClick}/>
            </header>
            <main className={styles.main}>
                {activeTab !== 'chats' ? (
                    <EmptyState/>
                ) : (
                    children
                )}
            </main>
            <footer className={styles.footer}>
                <Navbar activeTab={activeTab} onTabClick={handleTabClick} />
            </footer>
        </div>
    );
};

export default Layout;
