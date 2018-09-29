import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import { loadUsers, chooseUser } from 'actions/users'
import UsersList from "components/UsersList";


class UsersListContainer extends PureComponent {

    componentDidMount() {
        const { loadUsers, user } = this.props;
        loadUsers(user._id);
    }

    chooseUser = (selectedUserId) => {
        const { chooseUser } = this.props;
        chooseUser(selectedUserId);
    };

    render() {
        const { users } = this.props;
        return (
            <UsersList users={users} chooseUser={this.chooseUser}/>
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
        loadUsers: (userId) => dispatch(loadUsers(userId)),
        chooseUser: (userId) => dispatch(chooseUser(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)
