import React from 'react';

import {Picker, Emoji} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'
import "./MessageSendBox.scss";

const MessageSendBox = ({
    message,
    sendMessage,
    handleChange,
    handleKeyDown,
    handleClick,
    isOpen,
    addEmoji,
}) => (
    <div className="message-send-box">
        <div className="message-send-box__input-box">
            <input
                type="text"
                name="text"
                className="message-send-box__input"
                value={message.text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}/>
            <Emoji
                emoji=':grin:'
                size={24}
                onClick={handleClick}
            />
            {isOpen &&
                <Picker
                    emojiSize={24}
                    include={['recent', 'people', 'nature', 'food', 'activity']}
                    style={{position: 'absolute', right: '0', bottom: '50px', 'overflowY': 'hidden', 'zIndex': '10'}}
                    onSelect={addEmoji}
                />
            }
        </div>

        <button onClick={sendMessage} className="message-send-box__btn">Send</button>
    </div>
);
export default MessageSendBox;