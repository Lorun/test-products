import React from 'react';
import { Route, Link } from 'react-router-dom';
import ProductForm from './productForm';
import ProductList from './productList';

const Products = () => (
    <div className="App-container">
        <header>
            <Link to="/">Create Product</Link>
            <Link to="/products">Products</Link>
        </header>

        <main>
            <Route exact path="/" component={ProductForm} />
            <Route exact path="/products" component={ProductList} />
        </main>
    </div>
);

export default Products;