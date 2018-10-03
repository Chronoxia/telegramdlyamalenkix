import React from "react";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";

import history from "../../history";
import routes from "../../routes";
import ProtectedRoute from "containers/ProtectedRoute";
import ChatPageContainer from "containers/ChatPageContainer";

const Root = ({
    store
}) => (
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                {routes.map((route, idx) => <Route key={idx} {...route}/> )}
                <ProtectedRoute path='/chat' component={ChatPageContainer} />
            </Switch>
        </Router>
    </Provider>
);

export default Root;