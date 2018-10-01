import React from 'react';
import "./Message.css"

const Message = ({ text, author, userId }) => (
    <div className={ author === userId ? "client-message" : "message" }>
        {text}
    </div>
);

export default Message;