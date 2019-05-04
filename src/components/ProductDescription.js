import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDescription extends Component {
    render() {
        return (
            <section className="product-description">
                <h2 className="product-description__heading"><span>Details</span></h2>
                <div className="product-description__delimiter"></div>
                <div className="product-description__inner-html">
                    <div dangerouslySetInnerHTML={{ __html: this.props.description }} />
                </div>
            </section>
        );
    }
}

ProductDescription.defaultProps = {
    description: ''
};

ProductDescription.propTypes = {
    description: PropTypes.string.isRequired
};

export default ProductDescription;