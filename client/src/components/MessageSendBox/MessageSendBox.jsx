import React, { PureComponent } from 'react';
import {
    Row,
    Col,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";

import "./MessageSendBox.css"

import socket from "../../socket"

export default class MessageSendBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            message: {
                text: '',
            }
        };
    }

    handleChange = event => {
        const {  value } = event.target;
        const { message } = this.state;
        this.setState({
            message: {
                text: value
            }
        });
    };

    sendMessage = () => {
        const { message } = this.state;
        const  { addNewMessage } = this.props;
        // socket.emit("MESSAGE_ADD", {...message, time: Date.now()});
        addNewMessage(message);
        this.setState({
            message: {
                text: ''
            }
        });
    };

    render() {
        const { message } = this.state;
        return (
            <div className="message-sent-box">
                <Col xs={12}>
                    <FormGroup className="message-sent-box-group">
                        <FormControl type="text" name="text" value={message.text} onChange={this.handleChange} />
                        <Button onClick={this.sendMessage} className="sent-btn">Send</Button>
                    </FormGroup>
                </Col>
            </div>
        );
    }
}
