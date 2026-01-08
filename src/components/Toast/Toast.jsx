import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
    // Map type to system log prefix
    const getPrefix = (type) => {
        switch (type) {
            case 'success': return 'SYS_MSG >> SUCCESS';
            case 'error': return 'SYS_ERR >> CRITICAL';
            case 'warning': return 'SYS_WARN >> ALERT';
            default: return 'SYS_LOG >> INFO';
        }
    };

    return (
        <div className={`toast-item ${type}`} onClick={onClose}>
            <div className="toast-content">
                <span className="toast-prefix">{getPrefix(type)}</span>
                <span className="toast-message">{message}</span>
            </div>

            <button className="toast-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                [X]
            </button>
        </div>
    );
};

export default Toast;