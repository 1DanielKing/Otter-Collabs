import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const storedToken = localStorage.getItem('authToken');
            console.log('Retrieved token from localStorage:', storedToken);
            if (storedToken) {
                try {
                    const response = await fetch('http://localhost:8080/api/auth/checkStatus', {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`,
                        },
                    });
                    if (response.ok) {
                        // Token is valid, set the user state
                        const username = await response.text();
                        setUser({ token: storedToken, username });
                    } else {
                        // Token is invalid, clear the token and user state
                        localStorage.removeItem('authToken');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    localStorage.removeItem('authToken');
                    setUser(null);
                }
            }
            console.log("current user:", user);
        };

        validateToken();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", data.token);
                const userDetails = {
                    username,
                    userEmail: data.email,
                    userPhoto: data.imageURL,
                    instrument: data.instrument,
                    experience: data.experience,
                    genre: data.genre,
                };
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
                setUser({ token: data.token, ...userDetails });
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
