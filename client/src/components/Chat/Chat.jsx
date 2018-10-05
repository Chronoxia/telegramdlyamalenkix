import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageSendBoxContainer from "containers/MessageSendBoxContainer";
import MessagesList from "components/MessagesList/MessagesList";
import "./Chat.scss";

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
            <div className="chat">

                <div className="chat-info">
                    <img className="chat-info__image" src={conversation.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}/>
                    <span className="chat-info__title" >{conversation.title}</span>
                </div>

                <div className={conversation._id || chosenUser ? "messages-list" : "not-selected-conversation"}>
                    <MessagesList conversation={conversation} userId={userId} messages={this.state.selectedMessages} handleToggle={this.handleToggle} />

                    {(conversation._id || chosenUser) && <MessageSendBoxContainer/>}
                </div>

            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    conversation: state.conversations.conversations[ownProps.conversation] || {_id: null, messages: []},
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser
});

export default connect(mapStateToProps)(Chat);
