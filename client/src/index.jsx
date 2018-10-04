import React from 'react';
import { render } from 'react-dom';
import Root from "components/Root";
import configureStore from './store';
import { checkAuth } from "actions/user";
import './index.scss';

const store = configureStore();
store.dispatch(checkAuth());

render(
    <Root store={store}/>,
    document.getElementById('root')
);