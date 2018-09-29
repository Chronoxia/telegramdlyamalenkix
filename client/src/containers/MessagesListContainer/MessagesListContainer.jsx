import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import socket from "../../socket";

import MessagesList from "components/MessagesList";
import { addMessageSuccess } from "actions/conversation";

class MessagesListContainer extends PureComponent {
    componentDidMount() {
        console.log(11111, this.props.conversation)
        this.initSocket();
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.conversation);  
        if (prevProps.conversation && prevProps.conversation !== this.props.conversation) {
            socket.emit('USER_LEAVE', prevProps.conversation);
            socket.emit('USER_JOIN', this.props.conversation);
        }
    }

    initSocket() {  
        const { addMessageSuccess } = this.props;
        socket.on('MESSAGE_RECEIVED', (message) => {
            console.log(message)
            addMessageSuccess(message);
        })
    }

    render() {
        const { conversation, userId } = this.props;
        console.log(conversation);
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
