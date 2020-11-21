import React from 'react';

const InternalServerMessage = props => {
    return (
        <div className="error-message">
            <div className="error-message__icon-row">
                <i className="error-message__icon fas fa-tools"></i>
            </div>
            <div className="error-message__message-row">
                <p className="error-message__message">
                    Maaf, Service sedang bermasalah. Mohon coba beberapa saat lagi
                </p>
            </div>
        </div>
    )
}

export default InternalServerMessage;