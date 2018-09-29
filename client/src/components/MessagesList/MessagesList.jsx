import React, { PureComponent } from 'react';
import {
    Col,
} from "react-bootstrap";

import "./MessagesList.css"
import Message from '../Message';
import MessageSendBoxContainer from "containers/MessageSendBoxContainer";

export default class MessagesList extends PureComponent {

    //todo refactor this please
    render() {
        const { conversation, userId } = this.props;
        console.log(conversation);
        return (
            <Col xs={12} className={conversation._id ? "messages-list" : "not-selected-conversation"}>
                <div className="messages">
                    { conversation._id
                        ? (conversation.messages && conversation.messages.length
                        ? conversation.messages.map((message) =>  {console.log(message); return <Message key={message._id} text={message.text} author={message.author} userId={userId}/>})
                            : null)
                        : <span className="inform-message">Please select any chat to start messaging</span>
                    }
                </div>
                    { conversation._id ? <MessageSendBoxContainer/> : null }
            </Col>
        );
    }
}
