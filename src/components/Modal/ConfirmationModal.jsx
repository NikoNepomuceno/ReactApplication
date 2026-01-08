import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <div className="modal-decor-line"></div>
                </div>

                <div className="modal-body">
                    <p>{message}</p>
                </div>

                <div className="modal-footer">
                    <button className="modal-btn cancel" onClick={onCancel}>
                        ABORT
                    </button>
                    <button className="modal-btn confirm" onClick={onConfirm}>
                        CONFIRM
                    </button>
                </div>

                <div className="corner-decor top-right"></div>
                <div className="corner-decor bottom-left"></div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
