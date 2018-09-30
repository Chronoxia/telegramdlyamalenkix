import React, { PureComponent } from 'react';
import {
    Col,
} from "react-bootstrap";

import "./MessagesList.css"
import Message from '../Message';
import MessageSendBoxContainer from "containers/MessageSendBoxContainer";
import { connect } from 'react-redux';

class MessagesList extends PureComponent {
    //todo refactor this please
    render() {
        const { id, lastMessages } = this.props.conversation;
        const { userId } = this.props;
        return (
            <Col xs={12} className={id ? "messages-list" : "not-selected-conversation"}>
                <div className="messages">
                    { id
                        ? (lastMessages && lastMessages.length
                        ? lastMessages.map((message) =>  { return <Message key={message._id} text={message.text} author={message.author} userId={userId}/>})
                            : null)
                        : <span className="inform-message">Please select any chat to start messaging</span>
                    }
                </div>
                    { this.props.conversation ? <MessageSendBoxContainer/> : null }
            </Col>
        );
    }
}

export default connect(
    (state, ownProps) => {
        console.log(333, state);
        return {
            conversation: state.conversations.conversations[ownProps.conversation],
            userId: state.user.user._id
        }
    },
    (dispatch) => ({

    })
)(MessagesList)
