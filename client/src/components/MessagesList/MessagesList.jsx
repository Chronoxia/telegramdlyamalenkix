import React from "react";
import PropTypes from 'prop-types';
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

MessagesList.propTypes = {
    conversation: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
};

export default MessagesList;