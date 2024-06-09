import React, { ReactNode, createContext, useContext, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../constants/axiosInstance';
import AppLoader from '../assets/loaders/appLoader';

interface AuthContextType {
    token: string | null;
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    setUserDetails: (user: any) => void;
    isAuthenticated: boolean;
}

interface LoginResponse {
    token: string;
    user: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('/login', { email, password });
        const token = response.data.authJwtToken;
        const user = response.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return {
            token,
            user
        };
    } catch (error: any) {
        throw new Error('Failed to login: ' + error.message);
    }
};

const registerUser = async (name: string, email: string, password: string): Promise<void> => {
    try {
        await axiosInstance.post('/register', { name, email, password });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(`Failed to register ${error.response.data.errorMessage}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        } else {
            console.error('Non AxiosError:', error);
        }
        throw error; 
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    const userFromStorage = localStorage.getItem('user');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(userFromStorage ? JSON.parse(userFromStorage) : null);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { token, user } = await loginUser(email, password);
            localStorage.setItem('token', token);
            setUser(user);
            setTimeout(() =>{
                setLoading(false);
            }, 2000)
        } catch (error) {
            setLoading(false);
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            await registerUser(name, email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const setUserDetails = (user: any) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const isAuthenticated = !!token;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <AppLoader />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout, register, setUserDetails, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
