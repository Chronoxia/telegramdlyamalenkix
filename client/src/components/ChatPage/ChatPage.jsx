import React, {PureComponent} from 'react';

import ConversationsListContainer from "containers/ConversationsListContainer";
import ChatContainer from "containers/ChatContainer";
import AutocompleteContainer from "containers/AutocompleteContainer";
import Modal from "containers/Modal";
import "./ChatPage.scss";
import SettingsDropdown from "../SettingsDropdown/SettingsDropdown";


class ChatPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }
    }

    showModal = () => {
        this.setState({
            isOpen: true,
        });
    };

    closeModal = () => {
        this.setState({
            isOpen: false,
        })
    };

    render() {
        const { user } = this.props;
        return (
            <div className="chat-page">
                <div className="user-info">
                    <img className="user-info__image"
                         src={user.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}/>
                    <span className="user-info__nickname">{user.nickname}</span>
                    <SettingsDropdown/>
                </div>
                <div className="chat-box">
                    <div className="chat-box__conversations">
                        <div>
                            <AutocompleteContainer/>
                            <button className="chat-box__new" onClick={this.showModal}>
                                +
                            </button>
                            <Modal
                                isOpen={this.state.isOpen}
                                closeModal={this.closeModal}
                            />
                        </div>
                        <ConversationsListContainer/>
                    </div>
                    <div className="chat-box__chat"><ChatContainer/></div>
                </div>
            </div>
        )
    }
}

export default ChatPage;
