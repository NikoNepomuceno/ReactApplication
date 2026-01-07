import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState([]);

    const addToast = useCallback((message, type='info', duration=3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToast((prevToasts) => [...prevToasts, { id, message, type, duration }]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration );
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToast((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const value = {
        toast: {
            info:(msg, dur) => addToast(msg, 'info', dur),
            success: (msg, dur) => addToast(msg, 'success', dur),
            error: (msg, dur) => addToast(msg, 'error', dur),
            warning: (msg, dur) => addToast(msg, 'warning', dur),
        }
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-container">
                {toast.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used wihtin a ToastProvider');
    }

    return context.toast;
};