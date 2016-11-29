module.exports = {
    entry: './index.js',
    output: {
        filename: 'combined.js',
        publicPath: 'public'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'css-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }],
        noParse: [
            /node_modules\/webvr-polyfill/,
            /node_modules\/aframe/,
        ]
    }
}
