import React, {PureComponent} from 'react';
import "./SettingsDropdown.scss";

class SettingsDropdown extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        }
    }

    toggleModal = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen,
        });
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
                        <li className="settings-dropdown__item">Settings</li>
                        <li className="settings-dropdown__item">LogOut</li>
                    </ul>
                }
            </div>
        )
    }
}
export default SettingsDropdown;