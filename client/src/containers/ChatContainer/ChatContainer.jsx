import React, { PureComponent } from 'react';
import { connect } from "react-redux";

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

const mapStateToProps = (state, props) => ({
    ...props,
    conversation: state.conversations.activeConversation,
    userId: state.user.user._id,
    chosenUser: state.users.chosenUser,
});

export default connect(mapStateToProps)(ChatContainer);
