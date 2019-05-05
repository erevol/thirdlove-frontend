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
            <section className="slider">
                <div className="thumbnail">
                    <div className="thumbnail__img">
                        <img onClick={()=>this.handleClick(smallImg,largeImg)} src={tinyImg}></img>
                    </div>
                    {slides.map((src, index) => (
                        <div key={index} className="thumbnail__img">
                            <img onClick={()=>this.handleClick(imgSmall,imgLarge)} src={imgSmall}></img>
                        </div>
                    ))}
                </div>
                <div className="container">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: this.state.smallImgSelected,
                            },
                            largeImage: {
                                src: this.state.largeImgSelected,
                                width: 1426,
                                height: 2000
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
}

Thumbnail.defaultProps = {
    images: []
};

Thumbnail.propTypes = {
    images: PropTypes.array
};

export default Thumbnail;