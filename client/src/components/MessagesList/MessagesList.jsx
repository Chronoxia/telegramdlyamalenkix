import React from "react";
import Message from "components/Message";
import './MessagesList.css';

const MessagesList = ({
    conversation,
    userId,
    handleToggle,
    messages

}) => (
    <div className="messages">
        {conversation.messages.map((message) =>  (
                <Message key={message._id}
                         message={message}
                         userId={userId}
                         messages={messages}
                         handleToggle={handleToggle}/>
            ))
        }
    </div>
);

export default MessagesList;