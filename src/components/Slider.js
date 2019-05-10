import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from "react-slick";
import { PATH_HTTPS } from '../config';

class Slider extends Component {
    render() {
        const slides = [1,2,3,4];
        const settings = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { images } = this.props;

        if (!images) {
            return null;
        }

        const smallImg = PATH_HTTPS.concat(images[0].src600);
        const largeImg = PATH_HTTPS.concat(images[0].src1000);

        return (
            <section className="slider">
                <div className="slider__container">
                    <ReactSlick {...settings}>
                        {slides.map((src, index) => (
                            <div key={index}>
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            isFluidWidth: true,
                                            src: smallImg,
                                        },
                                        largeImage: {
                                            src: largeImg,
                                            width: 2000,
                                            height: 2228
                                        },
                                        enlargedImagePosition: 'over'
                                    }}
                                />
                            </div>
                        ))}
                    </ReactSlick>
                </div>
            </section>
        );
    }
}

Slider.defaultProps = {
    images: []
};

Slider.propTypes = {
    images: PropTypes.array
};

export default Slider;