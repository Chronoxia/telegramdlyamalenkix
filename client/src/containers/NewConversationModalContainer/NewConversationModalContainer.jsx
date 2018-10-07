import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createConversation } from 'actions/conversation';
import { loadUsers } from "actions/users";
import NewConversationModal from "components/NewConversationModal";

class NewConversationModalContainer extends Component {
  state = {
    title: 'Name',
    isEditing: false,
    participants: [],
    image: null,
  };

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
    const { users, isOpen, closeModal } = this.props;
    console.log(this.props);
    const { participants, image, isEditing, title } = this.state;

    return (
      <NewConversationModal
          handlePic={this.handlePic}
          handleClick={this.handleClick}
          handleSend = {this.handleSend}
          closeModal={closeModal}
          handleBlur={this.handleBlur}
          handleKeyDown={this.handleKeyDown}
          handleChange={this.handleChange}
          handleDoubleClick={this.handleDoubleClick}
          users={users}
          participants={participants}
          image={image}
          isEditing={isEditing}
          title={title}
          isOpen={isOpen}
      />
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

NewConversationModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewConversationModalContainer)

export default NewConversationModalContainer;