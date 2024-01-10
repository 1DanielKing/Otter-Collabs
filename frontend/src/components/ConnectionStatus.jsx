import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ConnectionStatus = () => {
    const [status, setStatus] = useState('Checking...');
    const { user } = useAuth();
    const token = user?.token;

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/checkStatus', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setStatus('Connected');
                } else {
                    setStatus('Not Connected');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setStatus('Not Connected');
            }
        };

        if (token) {
            checkLoginStatus();
        } else {
            setStatus('Not Connected');
        }
    }, [token]);

    return (
        <div>
            {status}
        </div>
    );
};

export default ConnectionStatus;