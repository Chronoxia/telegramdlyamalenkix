import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createConversation } from '../../actions/conversation';

class Modal extends Component {
  state = {
    title: 'Name',
    isEditing: false,
    participants: [],
  };

  renderTitle() {
    const { title, isEditing } = this.state;

    if (isEditing) {
      return (
        <input 
          onBlur={ this.handleBlur }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          value={title}
        />
      )
    }

    return (
      <p
        onDoubleClick={ this.handleDoubleClick }
      >
        {title}
      </p>
    )
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  handleBlur = (e) => {
    this.handleSave(e.target.value);
  };

  handleKeyDown = (e) => {
    if (e.which === 13) {
      const text = this.state.title.trim();
      this.handleSave(text);
    }
  };

  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    })
  };

  handleSave = (text) => {
    this.setState({
      title: text,
      isEditing: false,
    })
  };

  handleClick = (user) => {
    this.setState({
      participants: this.state.participants.concat(user)
    })
  };

  handleSend = () => {
    const { createConversation, closeModal } = this.props;

    createConversation(this.state.title, this.state.participants);
    this.props.closeModal();
  };

  render() {
    const { createConversation, cancel, users, isOpen } = this.props;

    return (
      <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
        { this.renderTitle() }
        <ul>
          {users.map(u => (
            <li 
              key={u._id}
            >
              <span>
                {u.nickname}
              </span>
              <button
                onClick={() => this.handleClick(u)}
              >
                add
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {this.state.participants.map(u => (
            <li
              key={u._id}
            >
              {u.nickname}
            </li>
          ))}
        </ul>
        <button
          onClick={ this.handleSend }
        >
          Create
        </button>
        <button
          onClick={ this.props.closeModal }
        >
          Close
        </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.entities,
})

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
  getUsers: () => console.log('yay!'),
  createConversation: (title, participants) => dispatch(createConversation(title, participants)),
  cancel: () => console.log('yay!'),
})

Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)

export default Modal;