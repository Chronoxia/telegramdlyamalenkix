import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { loadUsers } from 'actions/users';
import socket from "../../socket";
import { 
    getConversations,
    createConversationSuccess, 
} from 'actions/conversation';
import { addMessageSuccess } from "actions/message";
import ChatPage from "components/ChatPage";

class ChatPageContainer extends PureComponent {
    componentDidMount() {
        this.props.getConversations();
        this.props.getUsers();
        this.initSocket();
    }

    initSocket() {
        socket.on('yay', (m) => {
            console.log(m);
        });
        const { user } = this.props;
        socket.emit('USER_CONNECTED', user);
        const { addMessageSuccess, addConversation } = this.props;
        socket.on('MESSAGE_RECEIVED', (message) => {
            addMessageSuccess(message);
        });
        socket.on('CONVERSATION_RECEIVE', (conversation) => {
            addConversation(conversation);
            socket.emit('USER_JOIN', conversation._id)
        })
    }

    render() {
        const { user, isFetching } = this.props;
        if (isFetching) {
            return (
                <p>Fetching...</p>
            )
        }
        return (
            <ChatPage user={user}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    ...props,
    user: state.user.user,
    isFetching: state.conversations.isFetching,
});

const mapDispatchToProps = (dispatch, props) => ({
    getConversations: () => dispatch(getConversations()),
    addMessageSuccess: (message) => dispatch(addMessageSuccess(message)),
    addConversation: (conversation) => dispatch(createConversationSuccess(conversation)),
    getUsers: () => dispatch(loadUsers()),
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatPageContainer);

