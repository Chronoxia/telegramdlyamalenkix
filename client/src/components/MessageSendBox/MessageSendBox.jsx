import React, { PureComponent } from 'react';
import {
    Col,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";

import "./MessageSendBox.css"

import socket from "../../socket"

const MessageSentBox = ({
    message,
    sendMessage,
    handleChange,
}) => (
    <div className="message-sent-box">
        <Col xs={12}>
            <FormGroup className="message-sent-box-group">
                <FormControl type="text" name="text" value={message.text} onChange={handleChange} />
                <Button onClick={sendMessage} className="sent-btn">Send</Button>
            </FormGroup>
        </Col>
    </div>
);
export default MessageSentBox;