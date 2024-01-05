import React from 'react';
import ChatBox from './ChatBox';

const Layout = ({ children }) => {
    return (
        <>
            <div className="layout">
                <main>{children}</main>
                <ChatBox />
            </div>
        </>
    );
};

export default Layout;