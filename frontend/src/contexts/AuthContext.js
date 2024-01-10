import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [profileLoaded, setProfileLoaded] = useState(false);

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
                        loadProfileData(username);
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

    useEffect(() => {
        console.log("profileLoaded updated to: ", profileLoaded);
    }, [profileLoaded]);

    const loadProfileData = async (username) => {
        if (username === null || username === undefined) {
            username = user.username;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/users/search?username=${username}`);
            if (response.ok) {
                const profileData = await response.json();
                setUser(current => ({ ...current, ...profileData }));
                setProfileLoaded(true);
            } else {
                console.error('Failed to load profile data');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }

    };


    const loadProfileData = async (username) => {
        if (username === null || username === undefined) {
            username = user.username;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/users/search?username=${username}`);
            if (response.ok) {

                const data = await response.json();
                localStorage.setItem("authToken", data.token);
                setUser({ token: data.token, username: username });
                loadProfileData(username);

            } else {
                console.error('Failed to load profile data');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }

    };

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
        setUser({ token: data.token, username: username });
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
        <AuthContext.Provider value={{ user, login, logout, loadProfileData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
