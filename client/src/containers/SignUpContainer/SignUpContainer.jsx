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
                passwordConfirm: '',
                image: null,
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

    handlePic = event => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        if (!file) return;
        reader.onload = (r) => {
            this.setState({
                user: {
                    ...this.state.user,
                    image: r.target.result
                }
            })
        }
        reader.readAsDataURL(file);
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { register } = this.props;
        if (user.nickname && user.email && user.password && user.password === user.passwordConfirm) {
            register(user);
        }
    };

    render() {
        return (
            <SignUp
                handleSubmit={ this.handleSubmit }
                handleChange={ this.handleChange }
                handlePic={ this.handlePic }
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
