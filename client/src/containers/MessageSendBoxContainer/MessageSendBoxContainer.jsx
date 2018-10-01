import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { addMessage } from "actions/conversation";
import MessageSendBox from "../../components/MessageSendBox/MessageSendBox";

class MessageSendBoxContainer extends PureComponent {

    addNewMessage = (message) => {
        const { addMessage, conversationId,  userId, companionId } = this.props;
        addMessage(message, conversationId, userId, companionId);
    };

    render() {
        return (
            <MessageSendBox addNewMessage={this.addNewMessage}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    ...props,
    userId: state.user.user._id,
    companionId: state.users.chosenUser,
    conversationId: state.conversations.activeConversation,
});

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    addMessage: (message, conversationId, authorId, companionId) => dispatch(addMessage(message, conversationId, authorId, companionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBoxContainer)
