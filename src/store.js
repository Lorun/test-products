import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import products from './components/products/';

export const history = createHistory();

const initialState = {};
const middleware = [
    thunk,
    routerMiddleware(history)
];

const rootReducer = combineReducers({
    router: routerReducer,
    products
});


const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store