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
		console.log(this.props);
		const { users, chooseUser } = this.props;
		return (
			<ul className="users-list">
					{ users.map((user) => (
							<li className="users-item"
								key={user._id}
								onClick={chooseUser.bind(null, user._id)}>
								{user.nickname}
							</li>))
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
