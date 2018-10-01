import React from 'react';
import { connect } from 'react-redux';
import {
    Col,
} from "react-bootstrap";

import MessageSendBoxContainer from "containers/MessageSendBoxContainer";
import MessagesList from "components/MessagesList/MessagesList";
import "./Chat.css";

const Chat = ({
    conversation,
    userId,
    chosenUser,
}) => (
    <Col xs={12} className={conversation.id || chosenUser ? "messages-list" : "not-selected-conversation"}>
        <MessagesList conversation={conversation} userId={userId} />
        { (conversation.id || chosenUser) && <MessageSendBoxContainer/> }
    </Col>
);

const mapStateToProps = (state, ownProps) => ({
    conversation: state.conversations.conversations[ownProps.conversation] || {id: null, lastMessages: []},
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser
});

export default connect(mapStateToProps)(Chat);
