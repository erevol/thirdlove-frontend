import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        const { heading, price } = this.props;

        return (
            <header className="heading-area">
                <h1 className="heading-area__heading">{heading}</h1>
                <p className="heading-area__price">{price}</p>
            </header>
        );
    }

}

Header.defaultProps = {
    heading: '',
    price: ''
};

Header.propTypes = {
    heading: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
};

export default Header;