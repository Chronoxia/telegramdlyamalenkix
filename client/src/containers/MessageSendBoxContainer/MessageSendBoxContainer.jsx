import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { addMessage } from "actions/conversation";
import MessageSendBox from "../../components/MessageSendBox/MessageSendBox";

class MessageSendBoxContainer extends PureComponent {

    addNewMessage = (message) => {
        const { addMessage, conversationId,  userId, companionId } = this.props;
        addMessage(message, conversationId, userId, companionId)
    };

    render() {
        const { addMessage } = this.props;
        return (
            <MessageSendBox addNewMessage={this.addNewMessage}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        userId: state.user.user._id,
        companionId: state.users.chooseUser,
        conversationId: state.conversations.activeConversation,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        addMessage: (message, conversationId, authorId) => dispatch(addMessage(message, conversationId, authorId, companionId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBoxContainer)
