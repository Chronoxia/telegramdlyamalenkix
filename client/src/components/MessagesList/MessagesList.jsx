import React, { PureComponent } from 'react';
import {
    Col,
} from "react-bootstrap";

import "./MessagesList.css"
import Message from '../Message';
import MessageSendBoxContainer from "containers/MessageSendBoxContainer";
import { connect } from 'react-redux';

class MessagesList extends PureComponent {
    render() {
        const { id, lastMessages } = this.props.conversation;
        const { userId, chosenUser } = this.props;
        return (
            <Col xs={12} className={id || chosenUser ? "messages-list" : "not-selected-conversation"}>
                <div className="messages">
                    {
                        lastMessages.map((message) =>  (
                            <Message key={message._id}
                                     text={message.text}
                                     author={message.author}
                                     userId={userId}/>
                        ))
                    }
                </div>
                    { (id || chosenUser) && <MessageSendBoxContainer/> }
            </Col>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
        conversation: state.conversations.conversations[ownProps.conversation] || {id: null, lastMessages: []},
        userId: state.user.user._id,
        chosenUser: state.users.chosenUser
    });

export default connect(
    mapStateToProps
)(MessagesList)
