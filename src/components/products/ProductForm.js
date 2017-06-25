import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addProduct } from './index';

import { TextField, RaisedButton, Checkbox, CircularProgress } from 'material-ui';

import './ProductForm.css';


const initialState = {
    values: {
        name: '',
        colors: []
    },
    errorText: {}
};

const productColors = ['red', 'green', 'blue'];

const styles = {
    checkbox: {
        marginBottom: 8,
    }
};

const validationRules = {
    name: [
        {
            rule: (value) => (value.length >= 4 && value.length <= 8),
            message: 'Product name must be at least 4 but not more than 8 characters'
        }
    ]
};

class ProductForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();

        if (this.validate('name') && !this.props.products.isSaving) {
            this.props.addProduct({...this.state.values});
            this.setState(initialState);
        }
    }

    handleName(ev, name) {
        ev.preventDefault();
        name = String(name);
        this.setState({
            values: {
                ...this.state.values,
                name
            }
        });

        this.validate('name');
    }

    validate(key) {
        let message = validationRules[key].reduce((prev, current) => {
            message = !message && !current.rule(this.state.values[key])
                ? current.message
                : message;
            return message;
        }, '');

        this.setState({
            errorText: !!message ? {[key]: message} : {}
        });

        return !message;
    }

    handleColor(ev, checked) {
        let colors = [
            ...this.state.values.colors
        ];
        const index = colors.indexOf(ev.target.value);

        if (checked && index === -1) {
            colors.push(ev.target.value);
        } else {
            colors.splice(index, 1);
        }

        this.setState({
            values: {
                ...this.state.values,
                colors
            }
        });
    }


    render() {
        const colorCheckboxes = productColors.map((color, i) => (
            <Checkbox
                key={i}
                label={color}
                name="colors"
                value={color}
                checked={!(this.state.values.colors.indexOf(color)<0)}
                onCheck={this.handleColor}
                iconStyle={{fill: color}}
                style={styles.checkbox}
            />
        ));
        return(
            <form onSubmit={ this.handleSubmit } className="productForm">

                <TextField
                    hintText="Product Name"
                    floatingLabelText="Product Name"
                    value={this.state.values.name}
                    onChange={this.handleName}
                    required={true}
                    errorText={this.state.errorText.name ? this.state.errorText.name : ''}
                    fullWidth={true}
                />
                <br/><br/>

                <div className="productForm-label">Available Colors:</div>
                { colorCheckboxes }
                <br/>

                <RaisedButton label="Add Product" secondary={true} type="submit" />
                { this.props.products.isSaving ? <CircularProgress size={24} thickness={2} style={{marginLeft: 8}} /> : ''}
            </form>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addProduct
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm);