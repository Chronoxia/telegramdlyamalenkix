import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteConversation } from 'actions/conversation';

import MessageSendBoxContainer from 'containers/MessageSendBoxContainer';
import MessagesList from 'components/MessagesList/MessagesList';
import './Chat.scss';

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

    getStatusProperty() {
        const { conversation, userId } = this.props;
        if (!conversation.participants) return;
        const companion = conversation.participants.filter(item => item._id !== userId)[0];
        return companion.online ? "online" : `last seen at ${new Date(companion.updatedAt).toLocaleString()}`;
    }

    handleClick = (e) => {
        e.preventDefault();
        const { deleteConversation, conversation } = this.props;
        deleteConversation(conversation._id);
    };

    render() {
        const { conversation, userId, chosenUser } = this.props;
        return (
            <div className="chat">
                <div className="chat-info">
                    <img className="chat-info__image" src={conversation.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}/>
                    <span className="chat-info__title" >{conversation.title}</span>
                    {!conversation.author && <span className="chat-info__status">{this.getStatusProperty()}</span>}
                    <span
                        onClick={ this.handleClick }
                        style={{ cursor: 'pointer' }}
                    >
                        x
                    </span>
                </div>

                <div className={conversation._id || chosenUser ? "messages-list" : "not-selected-conversation"}>
                    <MessagesList conversation={conversation} userId={userId} messages={this.state.selectedMessages} handleToggle={this.handleToggle} />

                    {(conversation._id || chosenUser) && <MessageSendBoxContainer/>}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    conversation: state.conversations.conversations[ownProps.conversation] || {_id: null, messages: []},
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteConversation: (id) => dispatch(deleteConversation(id))
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Chat);
