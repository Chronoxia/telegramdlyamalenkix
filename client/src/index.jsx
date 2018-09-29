import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'
import {
    Grid,
} from "react-bootstrap";

import history from './history';
import store from './store';
import './index.css'
import routes from "./routes";
import ChatPageContainer from "./containers/ChatPageContainer/ChatPageContainer";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";
import { checkAuth } from "./actions/user";

class App extends Component {
    constructor() {
        super();
        store.dispatch(checkAuth())
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Grid fluid={true}>
                        <Switch>
                            {routes.map((route, idx) => <Route key={idx} {...route}/> )}
                            <ProtectedRoute path='/chat' component={ChatPageContainer} />
                        </Switch>
                    </Grid>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));