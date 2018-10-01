import React, {Fragment, PureComponent} from 'react';
import {
    Row,
    Col,
} from "react-bootstrap";

import ConversationsListContainer from "containers/ConversationsListContainer";
import ChatContainer from "containers/ChatContainer";
import UsersListContainer from "containers/UsersListContainer/UsersListContainer";
import "./ChatPage.css";

class ChatPage extends PureComponent {
    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col xs={12}>
                        <div className="user-info">
                            {user.nickname}
                        </div>
                    </Col>
                </Row>
                <Row className="chat-page">
                    <Col xs={3}>
                        <ConversationsListContainer/>
                        <UsersListContainer/>
                    </Col>
                    <Col xs={9}>
                        <ChatContainer />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default ChatPage;
