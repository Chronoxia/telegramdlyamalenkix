import React from 'react';
import {
    Col,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";

import "./MessageSendBox.css";

const MessageSendBox = ({
    message,
    sendMessage,
    handleChange,
    handleKeyDown,
}) => (
    <div className="message-sent-box">
        <Col xs={12}>
            <FormGroup className="message-sent-box-group">
                <FormControl type="text" name="text" value={message.text} onChange={handleChange} onKeyDown={handleKeyDown}/>
                <Button onClick={sendMessage} className="sent-btn">Send</Button>
            </FormGroup>
        </Col>
    </div>
);
export default MessageSendBox;