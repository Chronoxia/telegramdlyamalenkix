import React, {Fragment, PureComponent} from 'react'
import {connect} from "react-redux";

import { loadUsers } from 'actions/users'
import { checkConversation } from 'actions/conversation'
import UsersList from "components/UsersList";
import AutocompleteContainer from "containers/AutocompleteContainer";


class UsersListContainer extends PureComponent {

    componentDidMount() {
        const { loadUsers, user } = this.props;
        loadUsers(user._id);
    }

    chooseUser = (selectedUserId) => {
        const { checkConversation } = this.props;
        checkConversation(selectedUserId);
    };

    render() {
        const { users } = this.props;
        return (
            <Fragment>
                <AutocompleteContainer/>
                <UsersList users={users} chooseUser={this.chooseUser}/>
            </Fragment>
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
        checkConversation: (companionId) => dispatch(checkConversation(companionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)
