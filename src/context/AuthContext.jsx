import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const data = await authService.getMe();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data.user);
        return data;
    };
    
    const register = async (name, email, password) => {
        const data = await authService.register(name, email, password);
        setUser(data.user);
        return data;
    };
    
    const logout = async () => {
        await authService.logout();
        setUser(null);
    };
    
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

