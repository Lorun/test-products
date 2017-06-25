import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProducts } from './index';
import { List, ListItem, Avatar } from 'material-ui';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { orange500 } from 'material-ui/styles/colors';

const ProductList = props => {
    let productList;

    if (!props.items.length) {
        props.fetchProducts();
    }

    productList = props.items.map( (product, index) => {
        const colors = (typeof product.colors === 'string') ? product.colors.split(',') : product.colors;
        let renderColors = colors.map((color, i) => {
            const style = {
                display: 'inline-block',
                width: 16,
                height: 16,
                backgroundColor: color,
                borderRadius: 8,
                marginRight: 4
            };
            return(
                <span key={i} style={style}>&nbsp;</span>
            );
        });
        return(
            <ListItem
                key={index}
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={orange500} />}
                primaryText={product.name}
                secondaryText={renderColors}
            />
        )
    });

    return(
        <List>
            {productList}
        </List>
    );
};


const mapStateToProps = state => ({
    items: state.products.items
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);