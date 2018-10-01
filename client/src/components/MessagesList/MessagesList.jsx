import React from "react";
import Message from "components/Message";
import './MessagesList.css';

const MessagesList = ({
    conversation,
    userId,
}) => (
    <div className="messages">
        {conversation.lastMessages.map((message) =>  (
                <Message key={message._id}
                         text={message.text}
                         author={message.author}
                         userId={userId}/>
            ))
        }
    </div>
);

export default MessagesList;