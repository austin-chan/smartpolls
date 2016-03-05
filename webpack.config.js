var path = require("path");

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            // {
            //     //tell webpack to use jsx-loader for all *.jsx files
            //     test: /\.jsx$/,
            //     loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            // },
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
