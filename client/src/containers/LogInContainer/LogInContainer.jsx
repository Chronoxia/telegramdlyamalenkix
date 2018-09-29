import React, { PureComponent } from 'react'
import {connect} from "react-redux";

import { login } from 'actions/user'

import LogIn from "components/LogIn";

class LogInContainer extends PureComponent {

    handleSubmit = (type, user) => {
        const { login } = this.props;
        if (user.email && user.password) {
            login(user);
        }
    };

    render() {
        return (
            <LogIn handleSubmit={this.handleSubmit}/>
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
        login: (user) => dispatch(login(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer)
