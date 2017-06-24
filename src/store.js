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

// if (process.env.NODE_ENV === 'development') {
//     const devToolsExtension = window.devToolsExtension
//
//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension())
//     }
// }


const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store