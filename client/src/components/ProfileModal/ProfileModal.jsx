import React from 'react';
import PropTypes from 'prop-types';
import './ProfileModal.scss';

const ProfileModal = ({
  conversation,
  getImage,
  getTitle,
  getStatusProperty,
  getEmail,
  isOpen
}) => (
    isOpen &&
        <div className="modal profile modal">
            <div className="modal-main chat-info">

                <div className="chat-info__header">
                    <img className="chat-info__image" src={ getImage() }/>
                    <span className="chat-info__title" >{ getTitle() }</span>
                    {!conversation.author && <span className="chat-info__status">{getStatusProperty()}</span>}
                </div>

                <div className="chat-info__content">
                    {!conversation.author && <div className="chat-info__email">{getEmail()}</div>}
                    {conversation.author &&
                    <div>
                        <span >Participants of group: </span>
                        <ul className="chat-info__participants">
                            {conversation.participants.map((user) =>
                                <li key={user._id}>
                                    {user.nickname}
                                </li>)}
                        </ul>
                    </div>}
                </div>

            </div>
        </div>
    );

ProfileModal.propTypes = {
    conversation: PropTypes.object.isRequired,
    getImage: PropTypes.func.isRequired,
    getTitle: PropTypes.func.isRequired,
    getStatusProperty: PropTypes.func.isRequired,
    getEmail: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default ProfileModal;
