import React, {Component, Fragment} from 'react';
import './NewConversationModal.scss';
import Autocomplete from "components/Autocomplete/Autocomplete";

class NewConversationModal extends Component {
    renderTitle() {
        const { title, isEditing, handleBlur, handleKeyDown, handleChange, handleDoubleClick } = this.props;

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
                <p  className='newConversation__title'
                    onDoubleClick={ handleDoubleClick }
                >
                    {title}
                </p>
        )
    }

    selectUser = (user) => {
        this.props.handleClick(user);
        this.props.clearSearched();
    };

    render() {
        const { image, isOpen, users, handlePic, handleClick, participants, handleSend, closeModal, searchValue, handleChangeSearch} = this.props;

        return (
            isOpen && <div className={'newConversation modal'}>
                <div className='modal-main'>
                    { this.renderTitle() }
                    <input type="file" name="img" onChange={ handlePic }/>
                    {image && <img src={image} style={{width: '100px', height: '100px'}}/>}
                    <Autocomplete
                        handleChange={ handleChangeSearch }
                        selectUser={ this.selectUser }
                        searchValue={ searchValue }
                        searchedUsers={ users }
                    />
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

export default NewConversationModal;