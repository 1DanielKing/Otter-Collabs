import React from 'react';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useAuth(); // Destructure logout function from useAuth

    const handleLogout = async () => {
        try {
            await logout();
            onClose(); // Close modal after logging out
            // Redirect to home or login page if needed
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Log Out</h2>
                <p>Are you sure you want to log out?</p>
                <button onClick={handleLogout}>Yes, Log out</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default LogoutModal;