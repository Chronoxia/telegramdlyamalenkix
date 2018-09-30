import React, { PureComponent } from 'react'
import socket from "../../socket";
import { getConversations } from '../../actions/conversation';
import ChatPage from "components/ChatPage";
import {connect} from "react-redux";
import { addMessageSuccess } from '../../actions/conversation';

class ChatPageContainer extends PureComponent {
    componentDidMount() {
        this.props.getConversations();
        this.initSocket();
    }

    initSocket() {
        const { user } = this.props;
        socket.emit('USER_CONNECTED', user)
        const { addMessageSuccess } = this.props;
        socket.on('MESSAGE_RECEIVED', (message) => {
            addMessageSuccess(message);
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

function mapStateToProps(state, props) {
    return {
        ...props,
        user: state.user.user,
        isFetching: state.conversations.isFetching,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getConversations: () => dispatch(getConversations()),
    addMessageSuccess: (message) => dispatch(addMessageSuccess(message)),
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatPageContainer)

