var path = require("path");

module.exports = {
    entry: './entry.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets',
    },
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
