import authAxios from '@/services/authAxios';
import { useRouter } from 'next/router';
import React, { createContext, use, useContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
    };
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        router.push('/');
    };
    const getProfile = async () => {
        try {
            const {data} = await authAxios.get('/patient/profile');
            setUser(data?.data);
        } catch (error) {
            console.error('Error fetching profile', error);
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you can verify the token with the server here
            setIsLoggedIn(true);
            getProfile();
            // refresh token logic can be added here
            const interval = setInterval(() => {
                getProfile();
            }, 15 * 60 * 1000); // every 15 minutes

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <AppContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);