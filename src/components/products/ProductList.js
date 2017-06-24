import React from 'react';
import { connect } from 'react-redux';

const ProductList = props => {
    let productList = props.items.map( (product, i) =>
        <li key={i}>
            {product.name}
        </li>
    );

    return(
        <ul>
            {productList}
        </ul>
    );
};


const mapStateToProps = state => ({
    items: state.products.items
});

export default connect(
    mapStateToProps
)(ProductList);