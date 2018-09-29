import React, { PureComponent } from 'react'
import {connect} from "react-redux";
import socket from '../../socket';
import { loadUsers, addUser } from 'actions/users'
import { openConversation } from 'actions/conversation'
import UsersList from "components/UsersList";


class UsersListContainer extends PureComponent {

    componentDidMount() {
        const { loadUsers, addUser } = this.props;
        loadUsers();
        socket.on('USER_CONNECTED', (nickname) => {
            console.log('chelebos connected')
            addUser(nickname);
        })
    }

    createConversation = (selectedUserId) => {
        const { createConversation, user } = this.props;
        console.log(user._id, selectedUserId);
        createConversation(user._id, selectedUserId);
    };

    render() {
        const { users } = this.props;
        console.log('123123123123123', users);
        return (
            <UsersList users={users} createConversation={this.createConversation}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props,
        user: state.user.user,
        users: state.users.entities,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        loadUsers: () => dispatch(loadUsers()),
        createConversation: (myId, userId) => dispatch(openConversation(myId, userId)),
        addUser: (nickname) => dispatch(addUser(nickname)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)
