import React, { useState } from "react";
import ChatBox from "./ChatBox";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

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
