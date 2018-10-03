import React, { PureComponent} from 'react';
import Modal from 'containers/Modal';
import "./UsersList.css";


export default class UsersList extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		}
	}

	showModal = () => {
		this.setState({
			isOpen: true,
		});
	};

	closeModal = () => {
		this.setState({
			isOpen: false,
		})
	};

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
					<Modal
						isOpen={ this.state.isOpen }
						closeModal={ this.closeModal }
					/>
				<button
						onClick={ this.showModal }
				>
						+
				</button>
			</ul>
		);
	}
}
