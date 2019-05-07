import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as text from '../config';

class ProductForm extends Component {
    render() {
        const { colors } = this.props;

        if (!colors) {
            return null;
        }

        return (
            <section className="product-form">
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        <h2 className="product-form__label">{text.TEXT_COLOR}<span className="product-form__label--bold">{this.props.color}</span></h2>
                        <ul className="product-form__color-selector">
                            {this.props.colors.map(color => (
                                <li key={color} className="product-form__item">
                                    <input checked={this.props.selectedColor === color} onChange={this.props.onChangeColor}
                                        className="product-form__input" type="radio" name="color" id={color} value={color} />
                                    <label className={this.getColorSelectorClass(color)} htmlFor={color} value={color}></label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2 className="product-form__label">{text.TEXT_STOCK}<span className="product-form__label--bold">{this.props.getData('inventory_quantity')}</span></h2>
                    <div className="product-form__dropdown-group">
                        <div className="product-form__dropdown product-form__dropdown--first">
                            <label className="product-form__dropdown--label">{text.TEXT_BAND_SIZE}</label>
                            <select className="product-form__dropdown--control" name="selectedBandSize" onChange={this.props.onChangeBand}>
                                {this.props.bandSizes.map(size => (
                                    <option key={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <div className="product-form__dropdown">
                            <label className="product-form__dropdown--label">{text.TEXT_CUP_SIZE}</label>
                            <select value={this.props.selectedCupSize} className="product-form__dropdown--control" name="selectedCupSize" onChange={this.props.onChangeCup}>
                                {this.props.cupSizes.map(size => (
                                    <option key={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="product-form__submit-button product-form__btn product-form__btn--primary">{text.TEXT_ADD_TO_BAG}</button>
                </form>
            </section>
        );
    }

    getColorSelectorClass = (color) => {
        return classNames({
            'product-form__swatch': true,
            'product-form__swatch--shape': true,
            'product-form__swatch--checked': color === this.props.color,
            'product-form__swatch--color-1': 'naked-1' === color,
            'product-form__swatch--color-2': 'naked-2' === color,
            'product-form__swatch--color-3': 'naked-3' === color,
            'product-form__swatch--color-4': 'naked-4' === color,
            'product-form__swatch--color-5': 'naked-5' === color
        });
    }
}

ProductForm.defaultProps = {
    bandSizes: [],
    color: '',
    colors: [],
    cupSizes: [],
    selectedBandSize: '',
    selectedCupSize: ''
};

ProductForm.propTypes = {
    bandSizes: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
    cupSizes: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onChangeCup: PropTypes.func.isRequired,
    onChangeBand: PropTypes.func.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    selectedBandSize: PropTypes.string.isRequired,
    selectedCupSize: PropTypes.string.isRequired
};

export default ProductForm;