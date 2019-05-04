import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    render() {
        const { heading, price } = this.props;

        return (
            <header>
                <div className="area-heading">
                    <h1>{heading}</h1>
                    <p>{price}</p>
                </div>
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