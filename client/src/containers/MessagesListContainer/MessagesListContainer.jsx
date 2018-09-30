import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import socket from "../../socket";

import MessagesList from "components/MessagesList";
import { addMessageSuccess } from "actions/conversation";

class MessagesListContainer extends PureComponent {

    componentDidUpdate(prevProps) {
        console.log(this.props.conversation);  
        if (prevProps.conversation && prevProps.conversation !== this.props.conversation) {
            socket.emit('USER_LEAVE', prevProps.conversation);
            socket.emit('USER_JOIN', this.props.conversation);
        }
    }

    render() {
        const { conversation, userId } = this.props;
        if (!conversation) {
            return (
                <p>lalala</p>
            )
        }
        return (
            <MessagesList conversation={ conversation } userId={userId}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        conversation: state.conversations.activeConversation,
        userId: state.user.user._id
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        addMessageSuccess: (message) => dispatch(addMessageSuccess(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer)
