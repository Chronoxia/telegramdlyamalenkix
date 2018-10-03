import React from 'react';

import ConversationsListContainer from "containers/ConversationsListContainer";
import ChatContainer from "containers/ChatContainer";
import AutocompleteContainer from "containers/AutocompleteContainer";
import "./ChatPage.scss";


const ChatPage = ({
    user
}) => (
    <div className="chat-page">
        <div className="user-info">
            <img className="user-info__image" src={user.image || "https://otvet.imgsmail.ru/download/1448bb4efce8f11e7e5dd8578869146b_i-57.jpg"}/>
            <span className="user-info__nickname">{user.nickname}</span>
        </div>
        <div className="chat-box">
            <div className="chat-box__conversations">
                <AutocompleteContainer/>
                <ConversationsListContainer/>
            </div>
            <div className="chat-box__chat"><ChatContainer/></div>
        </div>
    </div>
);

export default ChatPage;
