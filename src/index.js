import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import Products from './containers/products/';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'sanitize.css/sanitize.css';
import './index.css';

const target = document.querySelector('#root');

injectTapEventPlugin();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <Products />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    target
);
