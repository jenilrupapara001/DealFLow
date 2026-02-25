import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [demoMode, setDemoMode] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await axios.get('/api/config/demo');
                setDemoMode(data.demoMode);
            } catch (err) {
                console.error('Failed to fetch demo config', err);
            }
        };

        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        }
        fetchConfig();
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('/api/users/login', { email, password });
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateProfile = async (userData) => {
        const { data } = await axios.put('/api/users/profile', userData);
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    return (
        <AuthContext.Provider value={{ user, loading, demoMode, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
