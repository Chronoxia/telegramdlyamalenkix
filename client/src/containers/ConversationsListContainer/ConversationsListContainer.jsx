import React, { PureComponent } from 'react'
import {connect} from "react-redux";
import socket from '../../socket';
import { changeConversation } from 'actions/conversation'
import ConversationsList from "components/ConversationsList";
import { 
    getAllConversations, 
} from '../../reducers/conversations';

class ConversationsListContainer extends PureComponent {
    componentDidMount() {
        this.props.conversations.forEach(conversation => {
            socket.emit('USER_JOIN', conversation._id)
        })
    }

    render() {
        const { conversations, changeConversation, activeConversation } = this.props;
        return (
            <ConversationsList
                activeConversation={ activeConversation }
                conversations={ conversations } 
                onClick={ changeConversation }
            />
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        user: state.user.user,
        conversations: getAllConversations(state),
        activeConversation: state.conversations.activeConversation
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        changeConversation: (id) => dispatch(changeConversation(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsListContainer)