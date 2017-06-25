import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import ProductForm from './productForm';
import ProductList from './productList';


const paths = [
    '/',
    '/products'
];

const RenderTabs = withRouter(({history}) => (
    <Tabs initialSelectedIndex={ paths.indexOf(history.location.pathname) }>
        <Tab label="Create product"
             onActive={() => {
                 history.push(paths[0])
             }}
        />
        <Tab label="Products"
             onActive={() => {
                 history.push(paths[1])
             }}
        />
    </Tabs>
));

const Products = () => (
    <div>
        <RenderTabs/>

        <main className="App-container">
            <Route exact path={paths[0]} component={ProductForm} />
            <Route exact path={paths[1]} component={ProductList} />
        </main>
    </div>
);

export default Products;