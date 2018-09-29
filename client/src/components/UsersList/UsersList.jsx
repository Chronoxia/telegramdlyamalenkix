import React, { PureComponent} from 'react';
import "./UsersList.css"


export default class UsersList extends PureComponent {

    render() {
        const { users, chooseUser } = this.props;
        return (
            <ul className="users-list">
                 { users && users.length ? users.map((user) =>
                     <li className="users-item" key={user._id} onClick={chooseUser.bind(null, user._id)}>{user.nickname}</li>) : null }
            </ul>
        );
    }
}
