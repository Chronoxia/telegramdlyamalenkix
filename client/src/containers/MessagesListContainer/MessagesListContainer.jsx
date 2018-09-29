import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import socket from "../../socket";

import MessagesList from "components/MessagesList";
import { addMessageSuccess } from "actions/conversation";

class MessagesListContainer extends PureComponent {
    componentDidMount() {
        this.initSocket();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.conversation._id !== this.props.conversation._id) {
            socket.emit('USER_LEAVE', prevProps.conversation._id);
            socket.emit('USER_JOIN', this.props.conversation._id);
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
        return (
            <MessagesList conversation={ conversation } userId={userId}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        conversation: state.conversation,
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
