import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import {
    Header, Slider, ProductForm,
    ProductDescription, Thumbnail
} from '../components'
import { API } from '../config';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bandSizes: [],
            color: 'naked-1',
            cupSizes: [],
            selectedBandSize: '32',
            selectedCupSize: 'D',
            selectedImg: 'thumbnail_img_0',
            store: [],
            loading: false,
            width: window.innerWidth
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get(API)
            .then(resp => this.setState({
                store: resp.data.product,
                loading: false
            }))
            .then(this.getColorsData)
            .then(this.getComboData)
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    render() {
        return (
            <Fragment>
                {this.renderLoading()}
                {!this.isDesktop() ? <Header {...this.getHeaderProps()} /> : null}
                <div className={this.getMainClass()}>
                    {this.isDesktop() ? this.renderDesktop() : this.renderMain()}
                </div>
            </Fragment>
        );
    }

    renderMain = () => {
        return (
            <div className="app__flex-row">
                {this.renderSlider()}
                <div className="app__flex-column">
                    <ProductForm {...this.getProductFormProps()} />
                </div>
                <ProductDescription {...this.getProductDescriptionProps()} />
            </div>
        );
    }

    renderDesktop = () => {
        return (
            <div className="app__flex-row">
                <div className="app__flex-column">
                    <Thumbnail {...this.getThumbnailProps()} />
                    <ProductDescription {...this.getProductDescriptionProps()} />
                </div>
                <div className="app__flex-column--small">
                    <Header {...this.getHeaderProps()} />
                    <ProductForm {...this.getProductFormProps()} />
                </div>
            </div>
        );
    }

    renderLoading = () => {
        return this.state.loading ? <div className="app__loading"></div> : null;
    }

    renderSlider = () => {
        return <Slider {...this.getSliderProps()} />;
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    getMainClass = () => {
        return classNames({
            'app__main': true,
            'app__main--hidden': this.state.loading
        });
    }

    getHeaderProps = () => {
        return {
            heading: this.state.store.title || '',
            price: this.getData('price') || ''
        };
    }

    getSliderProps = () => {
        return {
            images: this.getImages()
        };
    }

    getThumbnailProps = () => {
        return {
            images: this.getImages(),
            selectedImg: this.state.selectedImg,
            onChangeImg: this.onChangeImg
        };
    }

    getProductFormProps = () => {
        const state = this.state;

        return {
            bandSizes: state.bandSizes,
            color: state.color,
            colors: state.colors,
            cupSizes: state.cupSizes,
            getData: this.getData,
            handleSubmit: this.handleSubmit,
            onChangeCup: this.onChangeCup,
            onChangeBand: this.onChangeBand,
            onChangeColor: this.onChangeColor,
            selectedBandSize: state.selectedBandSize,
            selectedCupSize: state.selectedCupSize
        }
    }

    getProductDescriptionProps = () => {
        return {
            description: this.state.store.body_html || ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const state = this.state;

        if (!state.store) {
            return null;
        }

        alert('Added a ' + state.store.title + ' - ' + state.selectedBandSize
            + state.selectedCupSize + ' to the cart');
    }

    onChangeCup = e => {
        this.setState({ selectedCupSize: e.target.value });
    }

    onChangeBand = e => {
        this.setState({ selectedBandSize: e.target.value }, this.getCupSizeData);
    }

    onChangeColor = e => {
        this.setState({ color: e.target.value }, this.getComboData);
    }

    onChangeImg = e => {
        this.setState({ selectedImg: e.target.value });
    }

    getData = (type) => {
        if (!this.state.store.variants) {
            return null;
        }

        let variant = this.state.store.variants.find(item =>
            item.option2 === (this.state.selectedBandSize.concat(this.state.selectedCupSize)) &&
            item.option1 === this.state.color
        );

        if (!variant) {
            return '';
        }

        let result = parseFloat(variant[type]).toFixed(0);

        if (type === 'price') {
            result = '$' + result;
        }

        return result;
    }

    getImages = () => {
        let images = [];
        const { store } = this.state;

        if (!store.images) {
            return null;
        }

        images = store.images.filter((img, index) => this.state.color.substr(-1) == (index + 1));

        return images;
    }

    getColorsData = () => {
        const { store } = this.state;

        if (!store.variants) {
            return null;
        }

        let colors = _.chain(store.variants)
            .map(variant => variant.option1)
            .uniq()
            .sort()
            .value();

        this.setState({
            colors
        });
    }

    getCupSizeData = () => {
        const { store } = this.state;

        if (!store.variants) {
            return null;
        }

        let variants = store.variants.filter(variant =>
            variant.option1 === this.state.color &&
            variant.option2.substr(0, 2) === this.state.selectedBandSize &&
            variant.inventory_quantity >= 10
        ).map(variant => variant.option2);
        let cupSizes = [];

        if (variants) {
            cupSizes = _.chain(variants)
                .map(cup => cup.substr(2))
                .uniq()
                .sort()
                .value();
        }

        this.setState({
            cupSizes,
            selectedCupSize: cupSizes[0]
        });
    }

    getComboData = () => {
        const { store } = this.state;

        if (!store.variants) {
            return null;
        }

        let variants = store.variants.filter(variant =>
            variant.option1 === this.state.color &&
            variant.inventory_quantity >= 10
        ).map(variant => variant.option2);
        let bandSizes = [];
        let cupSizes = [];

        if (variants) {
            bandSizes = _.chain(variants)
                .map(band => band.substr(0, 2))
                .uniq()
                .sort((a, b) => a - b)
                .value();
            cupSizes = _.chain(variants)
                .map(cup => cup.substr(2))
                .uniq()
                .sort()
                .value();
        }

        this.setState({
            bandSizes,
            cupSizes,
            selectedBandSize: bandSizes[0],
            selectedCupSize: cupSizes[0],
            selectedImg: 'thumbnail_img_0'
        }, this.getCupSizeData);
    }

    isDesktop = () => {
        return this.state.width > 1440;
    }
}

export default App;