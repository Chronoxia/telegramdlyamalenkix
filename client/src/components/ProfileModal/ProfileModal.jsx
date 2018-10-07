import React from 'react';
import './ProfileModal.scss';

const ProfileModal = ({
  conversation,
  isOpen
}) => (
    isOpen &&
        <div className="modal profile modal">
            <div className="modal-main chat-info">
                <img className="chat-info__image"
                     src={conversation.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}/>
                <span className="chat-info__title">{conversation.title}</span>


                {!conversation.author && <span className="chat-info__status"></span>}

                {conversation.author &&
                    <ul className="chat-info__participants">
                        {conversation.participants.map((user) =>
                            <li key={user._id}>
                                {user.nickname}
                            </li>)}
                    </ul>}
            </div>
        </div>
    );

export default ProfileModal;
