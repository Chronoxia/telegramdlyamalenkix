import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
  state = {
    title: 'Name',
    isEditing: false,
    users: [],
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
  }

  handleKeyDown = (e) => {
    if (e.which === 13) {
      const text = this.state.title.trim();
      this.handleSave(text);
    }
  }

  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    })
  }

  handleSave = (text) => {
    this.setState({
      title: text,
      isEditing: false,
    })
  }

  handleClick = (user) => {
    this.setState({
      users: this.state.users.concat(user)
    })
  }

  render() {
    const { createConversation, cancel, users } = this.props;

    return (
      <div>
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
          {this.state.users.map(u => (
            <li
              key={u._id}
            >
              {u.nickname}
            </li>
          ))}
        </ul>
        <button
          onClick={ () => createConversation() }
        >
          Create
        </button>
        <button
          onClick={ () => cancel() }
        >
          Close
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.entities,
})

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => console.log('yay!'),
  createConversation: () => console.log('such wow'),
  cancel: () => console.log('yay!'),
})

Modal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)

export default Modal;