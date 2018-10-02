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
        {conversation.lastMessages.map((message) =>  (
                <Message key={message._id}
                         text={message.text}
                         id={message._id}
                         author={message.author}
                         userId={userId}
                         messages={messages}
                         handleToggle={handleToggle}/>
            ))
        }
    </div>
);

export default MessagesList;