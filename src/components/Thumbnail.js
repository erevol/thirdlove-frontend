import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import { PATH_HTTPS } from '../config';
import imgSmall from '../assets/images/naked-2.jpg';
import imgLarge from '../assets/images/naked-2@2x.jpg';

class Thumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            largeImgSelected: imgLarge,
            smallImgSelected: imgSmall
        }
    }

    render() {
        const slides = [1, 2, 3];
        const { images } = this.props;

        if (!images) {
            return null;
        }

        const tinyImg = PATH_HTTPS.concat(images[0].src100);
        const smallImg = PATH_HTTPS.concat(images[0].src600);
        const largeImg = PATH_HTTPS.concat(images[0].src1000);

        return (
            <section className="thumbnail__section">
                <div className="thumbnail">
                    <ul className="thumbnail__img-selector">
                        <li className="thumbnail__item">
                            <input checked={this.props.selectedImg === 'thumbnail_img_0'} onChange={this.props.onChangeImg}
                                className="thumbnail__input" type="radio" id="thumbnail_img_0" name="thumbnail_img_0"
                                value="thumbnail_img_0" />
                            <label className="thumbnail__label" htmlFor="thumbnail_img_0">
                                <img className="thumbnail__img" onClick={() => this.handleClick(smallImg, largeImg)} src={tinyImg}></img>
                            </label>
                        </li>
                        {slides.map((item, index) => (
                            <li key={item} className="thumbnail__item">
                                <input checked={this.props.selectedImg === `thumbnail_img_${item}`} onChange={this.props.onChangeImg}
                                    className="thumbnail__input" type="radio" id={`thumbnail_img_${item}`}
                                    value={`thumbnail_img_${item}`} name={`thumbnail_img_${item}`} />
                                <label key={index} className="thumbnail__label" htmlFor={`thumbnail_img_${item}`}>
                                    <img className="thumbnail__img" onClick={() => this.handleClick(imgSmall, imgLarge)} src={imgSmall}></img>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="thumbnail__img-container">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: this.getImgSelected(this.props.selectedImg, 'small', smallImg, largeImg),
                            },
                            largeImage: {
                                src: this.getImgSelected(this.props.selectedImg, 'large', smallImg, largeImg),
                                width: 2000,
                                height: 2228
                            },
                            enlargedImagePosition: 'over'
                        }}
                    />
                </div>
            </section>
        );
    }

    handleClick = (small, large) => {
        this.setState({
            smallImgSelected: small,
            largeImgSelected: large
        })
    }

    getImgSelected = (id, type, smallImg, largeImg) => {
        const index = id.substr(-1);

        const images = {
            small: imgSmall,
            large: imgLarge
        }

        if (index === '0') {
            _.assign(images, {
                small: smallImg,
                large: largeImg
            });
        }

        return images[type];
    }
}

Thumbnail.defaultProps = {
    images: [],
    selectedImg: 'thumbnail_img_0'
};

Thumbnail.propTypes = {
    images: PropTypes.array,
    selectedImg: PropTypes.string.isRequired,
    onChangeImg: PropTypes.func.isRequired
};

export default Thumbnail;