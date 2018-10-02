import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Col,
} from "react-bootstrap";

import MessageSendBoxContainer from "containers/MessageSendBoxContainer";
import MessagesList from "components/MessagesList/MessagesList";
import "./Chat.css";

class Chat extends Component {
    state = {
        selectedMessages: [],
    };

    handleToggle = (id) => {
        console.log(id);
        if (this.state.selectedMessages.some(m => m === id)) {
            return this.setState({
                selectedMessages: this.state.selectedMessages.filter(m => id !== m),
            })
        }
        this.setState({
            selectedMessages: this.state.selectedMessages.concat(id),
        })

    };

    render() {
        const { conversation, userId, chosenUser } = this.props;
        return (
            <Col xs={12} className={conversation.id || chosenUser ? "messages-list" : "not-selected-conversation"}>
                <MessagesList conversation={conversation} userId={userId} messages={this.state.selectedMessages} handleToggle={this.handleToggle} />
                {(conversation.id || chosenUser) && <MessageSendBoxContainer/>}
            </Col>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    conversation: state.conversations.conversations[ownProps.conversation] || {id: null, lastMessages: []},
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser
});

export default connect(mapStateToProps)(Chat);
