import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deleteConversation } from 'actions/conversation';
import { getMessages } from 'actions/message';
import { loadUsers } from 'actions/users';
import Chat from "components/Chat";

class ChatContainer extends PureComponent {
    render() {
        const { conversation, userId, chosenUser } = this.props;
        return (
            <Chat conversation={ conversation } userId={ userId } choosenUser={chosenUser} />
        );
    }
}

const mapStateToProps = (state) => ({
    conversation: state.conversations.conversations[state.conversations.activeConversation] || {_id: null, messages: []},
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser,
});

const mapDispatchToProps = (dispatch) => ({
    deleteConversation: (id) => dispatch(deleteConversation(id)),
    getMessages: (id, page) => dispatch(getMessages(id, page)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatContainer);
