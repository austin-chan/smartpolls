var path = require("path");
var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: './app/entry.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets',
    },
    plugins: PROD ? [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ] : [],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                loader: "babel-loader",
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                ],
                test: /\.jsx?$/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
