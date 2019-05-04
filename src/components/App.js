import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import axios from 'axios';
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
            store: [],
            loading: false
        }
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

    render() {
        return (
            <Fragment>
                <Header {...this.getHeaderProps()} />
                <main>
                    {/* <Thumbnail /> */}
                    {this.state.loading ? <div className="loader"></div> : null}
                    <Slider images={this.getImages()}/>
                    <ProductForm {...this.getProductFormProps()} />
                    <ProductDescription {...this.getProductDescriptionProps()} />
                </main>
            </Fragment>
        );
    }

    getHeaderProps = () => {
        return {
            heading: this.state.store.title || '',
            price: this.getData('price') || ''
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

        alert('Added a ' + state.store.title + ' - ' + state.selectedBandSize + state.selectedCupSize + ' to the cart');
    }

    onChangeCup = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeBand = e => {
        this.setState({ selectedBandSize: e.target.value }, this.getCupSizeData);
    }

    onChangeColor = e => {
        this.setState({ color: e.target.value }, this.getComboData);
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
        const {store} = this.state;

        if (!store.images) {
            return null;
        }

        images = store.images.filter((img,index) => this.state.color.substr(-1) == (index+1));

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
            selectedCupSize: cupSizes[0]
        }, this.getCupSizeData);
    }
}

export default App;