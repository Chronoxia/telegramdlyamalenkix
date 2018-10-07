import React, { Component } from 'react';
import { connect } from 'react-redux';

import {checkConversation, createConversation} from 'actions/conversation';
import { loadUsers } from "actions/users";
import NewConversationModal from "components/NewConversationModal";
import {clearSearched, searchUsers} from "actions/searchedUsers";

class NewConversationModalContainer extends Component {
  state = {
    title: 'Name',
    isEditing: false,
    participants: [],
    image: null,
    searchValue: '',
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  };

  handleChangeSearch = (e) => {
    this.setState({
        searchValue: e.target.value
    });

    const { searchUsers, clearSearched } = this.props;

    if (this.state.searchValue.length < 1) {
      clearSearched();
    }

    searchUsers(this.state.searchValue);
  };

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
    };
    reader.readAsDataURL(file);
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
    const { title, participants, image } = this.state;

    createConversation(title, participants, image);
    this.setState({
      title: 'Name',
      isEditing: false,
      participants: [],
      image: null,
    });
    closeModal();
  };

  handleClose = () => {
    this.setState({
      title: 'Name',
      isEditing: false,
      participants: [],
      image: null,
    });

    this.props.closeModal();
  };

  render() {
    const { users, isOpen } = this.props;

    return (
      <NewConversationModal
          handlePic={this.handlePic}
          handleClick={this.handleClick}
          handleSend = {this.handleSend}
          closeModal={ this.handleClose }
          handleBlur={this.handleBlur}
          handleKeyDown={this.handleKeyDown}
          handleChange={this.handleChange}
          handleDoubleClick={this.handleDoubleClick}
          handleChangeSearch={ this.handleChangeSearch }
          users={users}
          { ...this.state }
          isOpen={isOpen}
          clearSearched={this.props.clearSearched}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.searchedUsers.users,
});

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
  getUsers: () => dispatch(loadUsers()),
  createConversation: (title, participants, image) => dispatch(createConversation(title, participants, image)),
  searchUsers: (searchValue) => dispatch(searchUsers(searchValue)),
  clearSearched: () => dispatch(clearSearched())
});

NewConversationModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewConversationModalContainer);

export default NewConversationModalContainer;