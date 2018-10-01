import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import { login } from 'actions/user';
import LogIn from "components/LogIn";

class LogInContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
            },
            submitted: false,
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value,
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        const { login } = this.props;
        if (user.email && user.password) {
            login(user);
        }
    };

    render() {
        return (
            <LogIn
                handleSubmit={ this.handleSubmit }
                handleChange={ this.handleChange }
                { ...this.state }
            />
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    login: (user) => dispatch(login(user)),
});

export default connect(null, mapDispatchToProps)(LogInContainer)
