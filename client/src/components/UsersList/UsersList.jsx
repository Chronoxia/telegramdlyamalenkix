import React, { PureComponent} from 'react';
import "./UsersList.css"


export default class UsersList extends PureComponent {
	state = {
		isOpen: false,
	}

	handleToggle = () => {
		console.log(this.state.isOpen);
		this.setState({
			isOpen: !this.state.isOpen,
		})
		console.log(this.state.isOpen);
	}

	render() {
		const { users, chooseUser } = this.props;
		return (
			<ul className="users-list">
					{ users && users.length ? users.map((user) =>
							<li className="users-item" key={user._id} onClick={chooseUser.bind(null, user._id)}>{user.nickname}</li>) : null }
				<button
						onClick={ this.handleToggle }
				>
						+
				</button>
			</ul>
		);
	}
}
