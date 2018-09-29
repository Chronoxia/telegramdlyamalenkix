import React, {Component} from "react";
import { Route, Redirect } from 'react-router-dom';

import {connect} from "react-redux";

class ProtectedRoute extends Component {
    render() {
        const { component: Component, user, ...props } = this.props;
        return (
            <Route
                {...props}
                render={props => (
                    user ?
                        <Component {...props} /> :
                        <Redirect to='/login' />
                )}
            />
        )
    }
}
function mapStateToProps(state, props) {
    return {
        ...props,
        user: state.user.user,
    }
}
export default connect(mapStateToProps)(ProtectedRoute);