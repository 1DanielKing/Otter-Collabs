import React from 'react';
import ChatBox from './ChatBox';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <div className="layout">
            <Navbar />
                <main>{children}</main>
                <ChatBox />
            </div>
        </>
    );
};

export default Layout;