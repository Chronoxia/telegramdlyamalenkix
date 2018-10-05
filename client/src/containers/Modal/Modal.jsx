import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createConversation } from 'actions/conversation';
import { loadUsers } from "actions/users";

class Modal extends Component {
  state = {
    title: 'Name',
    isEditing: false,
    participants: [],
    image: null,
  };

  componentDidMount() {
    // this.props.getUsers()
  }

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

  handlePic = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;
    reader.onload = (r) => {
        this.setState({
          image: r.target.result
        })
    }
    reader.readAsDataURL(file);
}

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
    const { title, participants, image } = this.state;

    createConversation(title, participants, image);
    closeModal();
  };

  render() {
    const { users, isOpen } = this.props;

    return (
      <div className={isOpen ? 'modal display-block' : 'modal display-none'}>
        <div className="modal-main">
        { this.renderTitle() }
        <input type="file" name="img" onChange={ this.handlePic }/>
        { this.state.image && <img src={this.state.image} style={{ width: '100px', height: '100px'}} />}
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
  getUsers: () => dispatch(loadUsers()),
  createConversation: (title, participants, image) => dispatch(createConversation(title, participants, image)),
  cancel: () => console.log('yay!'),
})

Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)

export default Modal;