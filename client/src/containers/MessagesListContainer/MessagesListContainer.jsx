import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import socket from "../../socket";
import Modal from '../Modal';
import MessagesList from "components/MessagesList";
import { addMessageSuccess } from "actions/conversation";

class MessagesListContainer extends PureComponent {

    render() {
        const { conversation, userId, chosenUser } = this.props;
        if (!(conversation || chosenUser)) {
            return (
                <Modal />
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
        userId: state.user.user._id,
        chosenUser: state.users.chosenUser
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        addMessageSuccess: (message) => dispatch(addMessageSuccess(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer)
