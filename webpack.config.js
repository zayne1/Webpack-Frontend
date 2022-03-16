const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Webpack Example App',
            header: 'Webpack Example Title',
            metaDesc: 'Webpack Example Description',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        // new webpack.ProvidePlugin({
        //     // $: "jquery",
        //     // jQuery: "jquery",
        //     // "window.jQuery": "jquery"
        //     $: 'jquery/src/jquery',
        //     jQuery: 'jquery/src/jquery',
        // }), 
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/img',
                to: 'img'
            }, {
                from: 'src/fonts',
                to: 'fonts'
            }],

            options: { concurrency: 50 },
        }),
    ],
    mode: 'development',
    output: {
        clean: true
    },
    devServer: {
        // contentBase: './dist',
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        open: true,

        devMiddleware: {
            writeToDisk: true
        }
    },
        optimization: {
        minimize: false
    },
    module: {
        rules: 
        [{
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        }, {
            test: /\.(css)$/,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
            ]
        }, {
            test: /\.scss$/,
            
            include: [path.resolve(__dirname, 'src', 'scss')],
            
            use: [{
                loader: 'style-loader'
            }, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader'
            }]
        },
        // {
        //     test: require.resolve('jquery'),
        //     loader: 'expose-loader',
        //     options: {
        //       // exposes: ['$', 'jQuery'],
        //         exposes: {
        //             globalName: '$',
        //         },
        //     },
        // }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss']
    }
};