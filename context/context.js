import authAxios from '@/services/authAxios';
import { useRouter } from 'next/router';
import React, { createContext, use, useContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children, values }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showAskLogin, setShowAskLogin] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState({ title: '', description: '' });
    const [isShowBreadcrumbs, setIsShowBreadcrumbs] = useState(false);
    const router = useRouter();

    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
    };
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        if (typeof window !== 'undefined') {
            // remove cookie named 'token'
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
            document.cookie = 'token=; Max-Age=0; path=/;';
        }
        router.push('/');
    };
    const getProfile = async () => {
        try {
            const { data } = await authAxios.get('/patient/profile');
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
    // Define security questions array
    const securityQuestions = [
        "What was your childhood nickname?",
        "What is the name of your favorite childhood friend?",
        "What was your dream job as a child?",
        "What is your favorite movie?",
        "What is your mother's maiden name?",
        "What was the name of your first pet?",
        "What is your favorite book?",
        "What is your favorite food?",
        "What city were you born in?",
        "What is your favorite color?",
        "What was the make of your first car?",
        "What is your father's middle name?",
        "What is the name of your first school?",
        "What is your favorite sports team?",
        "What was your high school mascot?",
    ];

 
useEffect(() => {
    const handleRouteChange = () => {
        setBreadcrumbs({ title: '', description: '' });
        setIsShowBreadcrumbs(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
    };
}, [router]);
    return (
        <AppContext.Provider value={{
            ...values,
            user, isLoggedIn,
            login, logout,
            showLogin, setShowLogin,
            showForgotPassword, setShowForgotPassword,
            showRegister, setShowRegister,
            showAskLogin, setShowAskLogin,
            securityQuestions,
            breadcrumbs, setBreadcrumbs,
            isShowBreadcrumbs, setIsShowBreadcrumbs
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);