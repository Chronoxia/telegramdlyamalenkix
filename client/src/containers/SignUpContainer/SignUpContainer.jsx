import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import { register } from '../../actions/user'

import SignUp from 'components/SignUp';

class SignUpContainer extends PureComponent {

    handleSubmit = (type, user) => {
        const { register } = this.props;
        if (user.nickname && user.email && user.password && user.passwordConfirm) {
            register(user);
        }
    };

    render() {
        return (
            <SignUp handleSubmit={this.handleSubmit}/>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        ...props
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        ...props,
        register: (user) => dispatch(register(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
