const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
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