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
                        <h2>{text.TEXT_COLOR}<span>{this.props.color}</span></h2>
                        <ul className="color-selector">
                            {this.props.colors.map(color => (
                                <li key={color} className="color-option">
                                    <input checked={this.props.selectedColor === color} onChange={this.props.onChangeColor}
                                        className="color-option__input" type="radio" name="color" id={color} value={color} />
                                    <label className={this.getColorSelectorClass(color)} htmlFor={color} value={color}></label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2>{text.TEXT_STOCK}<span>{this.props.getData('inventory_quantity')}</span></h2>
                    <div className="dropdown-group">
                        <div className="dropdown dropdown--first">
                            <label className="dropdown--label">{text.TEXT_BAND_SIZE}</label>
                            <select className="dropdown--control" name="selectedBandSize" onChange={this.props.onChangeBand}>
                                {this.props.bandSizes.map(size => (
                                    <option key={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown">
                            <label className="dropdown--label">{text.TEXT_CUP_SIZE}</label>
                            <select value={this.props.selectedCupSize} className="dropdown--control" name="selectedCupSize" onChange={this.props.onChangeCup}>
                                {this.props.cupSizes.map(size => (
                                    <option key={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="submit-button btn btn-primary">{text.TEXT_ADD_TO_BAG}</button>
                </form>
            </section>
        );
    }

    getColorSelectorClass = (color) => {
        return classNames({
            'color-option__label': true,
            'color-option__label--color': true,
            'color-option__label--checked': color === this.props.color,
            'naked-1': 'naked-1' === color,
            'naked-2': 'naked-2' === color,
            'naked-3': 'naked-3' === color,
            'naked-4': 'naked-4' === color,
            'naked-5': 'naked-5' === color
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