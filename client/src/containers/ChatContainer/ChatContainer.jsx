import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import Modal from '../Modal';
import Chat from "components/Chat";

class ChatContainer extends PureComponent {
    render() {
        const { conversation, userId, chosenUser } = this.props;
        if (!(conversation || chosenUser)) {
            return (
                <Modal />
            )
        }
        return (
            <Chat conversation={ conversation } userId={ userId } />
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
