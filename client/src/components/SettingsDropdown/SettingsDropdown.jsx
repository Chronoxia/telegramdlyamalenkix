import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/user';
import "./SettingsDropdown.scss";

export class SettingsDropdown extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }
    }

    toggleModal = () => {
        const { isOpen } = this.state;
        this.setState((state, props) => ({
            isOpen: !state.isOpen,
        }));
    };

    handleClick = (e) => {
        localStorage.clear();
        this.props.logout();
    };

    render() {
        const { isOpen } = this.state;
        return (
            <div className="settings-dropdown" >
                <div className="settings-dropdown__btn" onClick={this.toggleModal}>
                    <i className="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i>
                </div>
                { isOpen &&
                    <ul className="settings-dropdown__options">
                        {/*<li className="settings-dropdown__item">Settings</li>*/}
                        <li className="settings-dropdown__item" onClick={ this.handleClick }>LogOut</li>
                    </ul>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(SettingsDropdown);