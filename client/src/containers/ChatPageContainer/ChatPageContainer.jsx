import React, { PureComponent } from 'react'
import socket from "../../socket";
import { getConversations } from '../../actions/conversation';
import ChatPage from "components/ChatPage";
import {connect} from "react-redux";

class ChatPageContainer extends PureComponent {
    componentDidMount() {
        this.props.getConversations();
        this.initSocket();
    }
    
    initSocket() {
        const { user } = this.props;
        console.log(123123123123, user)
        socket.emit('USER_CONNECTED', user)
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
    getConversations: () => dispatch(getConversations())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ChatPageContainer)

