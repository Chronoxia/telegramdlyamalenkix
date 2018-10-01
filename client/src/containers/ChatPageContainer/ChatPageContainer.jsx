import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import socket from "../../socket";
import { 
    getConversations, 
    addMessageSuccess, 
    createConversationSuccess, 
} from '../../actions/conversation';
import ChatPage from "components/ChatPage";

class ChatPageContainer extends PureComponent {
    componentDidMount() {
        this.props.getConversations();
        this.initSocket();
    }

    initSocket() {
        const { user } = this.props;
        socket.emit('USER_CONNECTED', user);
        const { addMessageSuccess, addConversation } = this.props;
        socket.on('MESSAGE_RECEIVED', (message) => {
            addMessageSuccess(message);
        });
        socket.on('CONVERSATION_RECEIVE', (conversation) => {
            addConversation(conversation);
            socket.emit('USER_JOIN', conversation.id)
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
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatPageContainer);

