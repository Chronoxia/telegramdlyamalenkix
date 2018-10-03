import React, { PureComponent} from 'react';
import "./UsersList.css";


export default class UsersList extends PureComponent {
	render() {
		const { users, chooseUser } = this.props;
		return (
			<ul className="users-list">
					{ users.map((user) => (
						<li className="users-item"
							key={user._id}
							onClick={() => chooseUser(user._id)}>
							<img 
								style={{width: '50px', height: '50px', borderRadius: '50%'}}
								src={user.image || ""} 
								alt="profile picture"/>
							<span>{user.nickname}</span>
						</li>
						))
					}
			</ul>
		);
	}
}
