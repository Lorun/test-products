import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addProduct } from './index';

import './ProductForm.css';

class ProductForm extends React.Component {

    handleCreateProduct(ev) {
        ev.preventDefault();

        let colors = [];
        for (let i=0; i<ev.target.colors.length; i++) {
            ev.target.colors[i].checked && colors.push(ev.target.colors[i].value);
        }

        const product = {
            name: ev.target.name.value,
            colors
        };

        this.props.addProduct(product);

        ev.target.reset();
    }

    render() {
        return(
            <form onSubmit={this.handleCreateProduct.bind(this)}>
                <label htmlFor="product-name"><b>Product name:</b></label><br/>
                <input type="text" name="name" id="product-name" /><br/>

                <div>
                    <b>Colors:</b><br/>
                    <label><input type="checkbox" name="colors" value="red"/> red</label><br/>
                    <label><input type="checkbox" name="colors" value="green"/> green</label><br/>
                    <label><input type="checkbox" name="colors" value="blue"/> blue</label><br/>
                </div>

                <button type="submit">Add Product</button>
            </form>
        );
    }
}

/*const ProductForm = props => (

);*/


const mapStateToProps = state => ({
    items: state.products.items
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addProduct
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm);