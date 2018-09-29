import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import { addMessage } from "actions/conversation";
import MessageSendBox from "../../components/MessageSendBox/MessageSendBox";

class MessageSendBoxContainer extends PureComponent {

    addNewMessage = (message) => {
        const { addMessage, conversationId,  userId} = this.props;
        addMessage(message, conversationId, userId)
    };

    render() {
        const { addMessage } = this.props;
        return (
            <MessageSendBox addNewMessage={this.addNewMessage}/>
        );
    }
}

function mapStateToProps(state, props) {
    console.log(state.conversations.activeConversation)
    return {
        ...props,
        userId: state.user.user._id,
        conversationId: state.conversations.activeConversation,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        addMessage: (message, conversationId, author) => dispatch(addMessage(message, conversationId, author)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBoxContainer)
