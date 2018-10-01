import React, {Fragment, PureComponent} from 'react'
import {connect} from "react-redux";

import { loadUsers } from 'actions/users';
import { checkConversation } from 'actions/conversation';
import UsersList from "components/UsersList";
import AutocompleteContainer from "containers/AutocompleteContainer";

class UsersListContainer extends PureComponent {
    componentDidMount() {
        const { loadUsers } = this.props;
        loadUsers();
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

const mapStateToProps = (state, props) => ({
    ...props,
    user: state.user.user,
    users: state.users.entities,
});

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    loadUsers: () => dispatch(loadUsers()),
    checkConversation: (companionId) => dispatch(checkConversation(companionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
