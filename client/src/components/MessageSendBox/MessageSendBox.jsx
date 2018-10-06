import React from 'react';
import {
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";

import { Picker, Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'
import "./MessageSendBox.css";

const MessageSendBox = ({
    message,
    sendMessage,
    handleChange,
    handleKeyDown,
    handleClick,
    isOpen,
    addEmoji,
}) => (
    <div className="message-sent-box">
            { isOpen && 
                <Picker 
                    emojiSize={24}
                    style={{ position: 'absolute' }}
                    onSelect={ addEmoji }
                    sheetSize={16}
                />
            }
            <FormGroup className="message-sent-box-group">
                <FormControl 
                    type="text" 
                    name="text" 
                    value={message.text} 
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown}/>
                <Emoji 
                    emoji={{ id: 'rage'}}
                    size={24}
                    onClick={ handleClick }
                />
                <Button onClick={sendMessage} className="sent-btn">Send</Button>
            </FormGroup>
    </div>
);
export default MessageSendBox;