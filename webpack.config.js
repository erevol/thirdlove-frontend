const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const settings = {
    distPath: path.join(__dirname, "dist"),
    srcPath: path.join(__dirname, "src")
};

function srcPathExtend(subpath) {
    return path.join(settings.srcPath, subpath)
};

const config = {
    entry: srcPathExtend('index.js'),
    output: {
        filename: 'bundle.js',
        path: settings.distPath,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ico$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: '/images'
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                    publicPath: '/fonts'
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CleanWebpackPlugin({
            verbose: true
        }),
        new HtmlWebpackPlugin({
            template: srcPathExtend('index.html')
        })
    ],
}

if (process.env.NODE_ENV === 'production') {
    config.devtool = 'source-map',
    config.mode = 'production'
} else {
    config.mode = 'development'
    config.devtool = 'inline-source-map';
    config.devServer = {
        contentBase: path.resolve(__dirname, 'src'),
        port: 3000,
        proxy: {
            '/**': {
                target: '/index.html',
                secure: false,
                bypass(req) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html'
                    }

                    return '';
                }
            }
        }
    };
}

module.exports = config;