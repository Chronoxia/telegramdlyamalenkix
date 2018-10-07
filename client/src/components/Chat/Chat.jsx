import React, {Component, Fragment} from 'react';
import MessageSendBoxContainer from 'containers/MessageSendBoxContainer';
import MessagesList from 'components/MessagesList/MessagesList';
import './Chat.scss';
import ProfileModal from "../ProfileModal/ProfileModal";

class Chat extends Component {
    state = {
        selectedMessages: [],
        profileModalIsOpen: false,
    };

    handleToggle = (id) => {
        if (this.state.selectedMessages.some(m => m === id)) {
            this.setState({
                selectedMessages: this.state.selectedMessages.filter(m => id !== m),
            })
        } else {
            this.setState({
                selectedMessages: this.state.selectedMessages.concat(id),
            })
        }

    };

    getStatusProperty = () => {
        const { conversation, userId, chosenUser } = this.props;
        if (chosenUser) {
            return chosenUser.online ? 'online' : `last seen at ${new Date(chosenUser.updatedAt).toLocaleString()}`;
        }

        if (!conversation.participants) return;

        const companion = conversation.participants.filter(item => item._id !== userId)[0];
        return companion.online ? "online" : `last seen at ${new Date(companion.updatedAt).toLocaleString()}`;
    };

    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { deleteConversation, conversation } = this.props;
        deleteConversation(conversation._id);
    };

    handleLoad = () => {
        const { conversation, getMessages } = this.props;

        getMessages(conversation._id, conversation.page);
    };

    getImage = () => {
        const { conversation, userId, chosenUser } = this.props;
        if (conversation.image) return conversation.image;
        if (chosenUser && chosenUser.image) return chosenUser.image;
        return "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg";
    };

    getTitle = () => {
        const { chosenUser, conversation } = this.props;

        if (chosenUser) return chosenUser.nickname;

        return conversation.title
    };

    getEmail = () => {
        const { conversation, userId, chosenUser } = this.props;
        if (chosenUser) {
            return chosenUser.email;
        }

        if (!conversation.participants) return;

        const companion = conversation.participants.filter(item => item._id !== userId)[0];
        return companion.email;
    };

    handleClickModal = () => {
       this.setState((state)=> ({
           ...state,
           profileModalIsOpen: !state.profileModalIsOpen,
       }))
    };

    render() {
        const { conversation, userId, chosenUser } = this.props;
        const { profileModalIsOpen } = this.state;

        return (
            <div className={conversation._id || chosenUser ? "chat" : "chat--not-selected"}>
                {(conversation._id || chosenUser) &&
                <Fragment>
                <div className="chat-info" onClick={this.handleClickModal}>
                    <img className="chat-info__image" src={ this.getImage() }/>
                    <span className="chat-info__title" >{ this.getTitle() }</span>
                    {!conversation.author && <span className="chat-info__status">{this.getStatusProperty()}</span>}
                    <span
                        onClick={ this.handleClick }
                        className="chat__delete"
                    >
                        x
                    </span>
                    <ProfileModal
                        conversation={conversation}
                        isOpen={profileModalIsOpen}
                        getImage={this.getImage}
                        getTitle={this.getTitle}
                        getEmail={this.getEmail}
                        getStatusProperty={this.getStatusProperty}
                    />
                </div>
                { conversation.messages &&
                    <button
                        onClick={ this.handleLoad }
                    >
                        { conversation.isFetching ? 'loading...' : 'load more' }
                    </button>
                }
                <div className="messages-list">
                    <MessagesList conversation={conversation} userId={userId} messages={this.state.selectedMessages} handleToggle={this.handleToggle} />

                            <MessageSendBoxContainer/>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default Chat
