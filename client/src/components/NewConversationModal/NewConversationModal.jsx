import React, {Component, Fragment} from 'react';
import './NewConversationModal.scss'

class NewConversationModal extends Component {
    renderTitle() {
        const { title, isEditing, handleBlur, handleKeyDown, handleChange, handleDoubleClick} = this.props;

        if (isEditing) {
            return (
                <input className='newConversation__title'
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    value={title}
                />
            )
        }
        return (
            <Fragment>
                <p  className='newConversation__title'
                    onDoubleClick={ handleDoubleClick }
                >
                    {title}
                </p>
            </Fragment>
        )
    }

    render() {
        const { image, isOpen, users, handlePic, handleClick, participants, handleSend, closeModal} = this.props;
        console.log(this.props);

        return (
            isOpen && <div className={'newConversation modal'}>
                <div className='modal-main'>
                    { this.renderTitle() }
                    <input type="file" name="img" onChange={ handlePic }/>
                    {image && <img src={image} style={{width: '100px', height: '100px'}}/>}
                    <ul>
                        {users.map(u => (
                            <li
                                key={u._id}
                            >
                                <span>
                                  {u.nickname}
                                </span>
                                <button
                                    onClick={() => { handleClick(u)}}
                                >
                                    add
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {participants.map(u => (
                            <li
                                key={u._id}
                            >
                                {u.nickname}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleSend}
                    >
                        Create
                    </button>
                    <button
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }
}

export default NewConversationModal