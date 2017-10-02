var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
;

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

// export webpack config
module.exports = {
    //devtool: 'source-map',
    devtool: 'source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        path: __dirname + '/../www',
        filename: "bundle.js"
    },
    resolve: {
        modules: ['node_modules', './src', './js'],
        extensions: ['.js', '.jsx', '.css', '.scss' ]
    },

    // declare loaders to be used in webpack
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.scss$|\.css$/i,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader?name=[path][name].[ext]"
            },
			{
				test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: "file-loader?name=[path][name].[ext]"
			}
        ]
    },
    // initialize the added webpack plugins
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ]
};
