import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { loadUsers } from 'actions/users';
import socket from "../../socket";
import { 
    getConversations,
    createConversationSuccess, 
    changeConversation,
} from 'actions/conversation';
import { addMessageSuccess, addNewMessageSuccess } from "actions/message";
import ChatPage from "components/ChatPage";

class ChatPageContainer extends PureComponent {
    componentDidMount() {
        console.log(this.props.activeConversation);
        this.props.getConversations();
        this.props.getUsers();
        socket.on('yay', (m) => {
            console.log(m);
        });
        const { user } = this.props;
        socket.emit('USER_CONNECTED', user);
        const { addMessageSuccess, addConversation, changeConversation, addNewMessageSuccess, activeConversation, conversations } = this.props;
        socket.on('MESSAGE_RECEIVED', (message) => {
            console.log(message);
            console.log(message.conversationId);
            console.log(conversations);
            if (message.author === user._id || message.conversationId === activeConversation) {
                addNewMessageSuccess(message);
            } else {
                addMessageSuccess(message);
            }
        });
        socket.on('CONVERSATION_RECEIVE', (conversation) => {
            addConversation(conversation);
            socket.emit('USER_JOIN', conversation._id)
        });
        socket.on('CONVERSATION_CREATED', (conversation) => {
            addConversation(conversation);
            changeConversation(conversation._id);
            socket.emit('USER_JOIN', conversation._id);
        })
    }

    componentDidUpdate() {
        console.log(this.props.activeConversation);
    }

    initSocket() {
        // socket.on('yay', (m) => {
        //     console.log(m);
        // });
        // const { user } = this.props;
        // socket.emit('USER_CONNECTED', user);
        // const { addMessageSuccess, addConversation, changeConversation, addNewMessageSuccess, activeConversation, conversations } = this.props;
        // socket.on('MESSAGE_RECEIVED', (message) => {
        //     console.log(message);
        //     console.log(message.conversationId);
        //     console.log(conversations);
        //     if (message.author === user._id || message.conversationId === activeConversation) {
        //         addNewMessageSuccess(message);
        //     } else {
        //         addMessageSuccess(message);
        //     }
        // });
        // socket.on('CONVERSATION_RECEIVE', (conversation) => {
        //     addConversation(conversation);
        //     socket.emit('USER_JOIN', conversation._id)
        // });
        // socket.on('CONVERSATION_CREATED', (conversation) => {
        //     addConversation(conversation);
        //     changeConversation(conversation._id);
        //     socket.emit('USER_JOIN', conversation._id);
        // })
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
    conversations: state.conversations,
    activeConversation: state.conversations.activeConversation,
    user: state.user.user,
    isFetching: state.conversations.isFetching,
});

const mapDispatchToProps = (dispatch, props) => ({
    getConversations: () => dispatch(getConversations()),
    addMessageSuccess: (message) => dispatch(addMessageSuccess(message)),
    addNewMessageSuccess: (message) => dispatch(addNewMessageSuccess(message)),
    addConversation: (conversation) => dispatch(createConversationSuccess(conversation)),
    changeConversation: (id) => dispatch(changeConversation(id)),
    getUsers: () => dispatch(loadUsers()),
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatPageContainer);

