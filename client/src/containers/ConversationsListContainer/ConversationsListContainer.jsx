import React, { PureComponent } from 'react'
import {connect} from "react-redux";
import socket from '../../socket';
import { loadUsers, addUser } from 'actions/users'
import { openConversation, changeConversation } from 'actions/conversation'
import ConversationsList from "components/ConversationsList";
import { 
    getAllConversations, 
    getConversationsById 
} from '../../reducers/conversations';


class ConversationsListContainer extends PureComponent {
    render() {
        const { conversations, changeConversation } = this.props;
        return (
            <ConversationsList 
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
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        changeConversation: (id) => dispatch(changeConversation(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsListContainer)