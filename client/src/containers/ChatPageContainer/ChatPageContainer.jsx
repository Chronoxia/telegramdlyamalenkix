import React, { PureComponent } from 'react'
import socket from "../../socket";

import ChatPage from "components/ChatPage";
import {connect} from "react-redux";

class ChatPageContainer extends PureComponent {

    componentDidMount() {
        this.initSocket();
    }

    initSocket() {
        const { user } = this.props;
        console.log(123123123123, user)
        socket.emit('USER_CONNECTED', user)
    }

    render() {
        const { user } = this.props;
        return (
            <ChatPage user={user}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        user: state.user.user,
    }
}

export default connect(mapStateToProps)(ChatPageContainer)

