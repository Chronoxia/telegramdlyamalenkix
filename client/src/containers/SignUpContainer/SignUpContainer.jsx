import React, { PureComponent } from 'react';
import { connect } from "react-redux";

import { register } from '../../actions/user';
import SignUp from 'components/SignUp';

class SignUpContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                nickname: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            submitted: false
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        const { register } = this.props;
        if (user.nickname && user.email && user.password && user.passwordConfirm) {
            register(user);
        }
    };

    render() {
        return (
            <SignUp
                handleSubmit={ this.handleSubmit }
                handleChange={ this.handleChange }
                { ...this.state }
            />
        );
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    ...props,
    register: (user) => dispatch(register(user)),
});

export default connect(null, mapDispatchToProps)(SignUpContainer)
