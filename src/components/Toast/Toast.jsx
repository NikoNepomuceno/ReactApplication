import React, { useEffect } from 'react';
import './Toast.css';


const Toast = ({ message, type, onClose }) => {
    return (
        <div className={`toast-item ${type}`} onClick={onClose}> 
            <div className="toast-content">
                <span className="toast-message">{message}</span>
            </div>

            <button className="toast-close" onClick={onClose}>&times;</button>
            
        </div>
    );
};

export default Toast;