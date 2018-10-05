import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { addMessage } from "actions/message";
import MessageSendBox from "../../components/MessageSendBox/MessageSendBox";

class MessageSendBoxContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            message: {
                text: '',
            }
        };
    }

    handleChange = event => {
        this.setState({
            message: {
                text:  event.target.value
            }
        });
    };

    handleKeyDown = event => {
        if (event.which === 13) {
            this.sendMessage();
        }
    };

    sendMessage = () => {
        const { message } = this.state;
        if (!this.state.message.text.trim()) return;
        const  { addMessage, conversationId, userId, companionId } = this.props;
        addMessage(message.text, conversationId, userId, companionId );
        this.setState({
            message: {
                text: ''
            }
        });
    };

    render() {
        return (
            <MessageSendBox  message={ this.state.message }
                             sendMessage={ this.sendMessage }
                             handleChange={ this.handleChange }
                             handleKeyDown={ this.handleKeyDown }
                             />
        );
    }
}

const mapStateToProps = (state, props) => ({
    ...props,
    userId: state.user.user._id,
    companionId: state.users.chosenUser,
    conversationId: state.conversations.activeConversation,
});

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    addMessage: (message, conversationId, authorId, companionId) => dispatch(addMessage(message, conversationId, authorId, companionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageSendBoxContainer)
