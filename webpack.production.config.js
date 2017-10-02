var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyPlugin = require('copy-webpack-plugin')
;

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

var CopyPluginResConfig = new CopyPlugin([
    {
        from: './res',
        to: './res'
    }
]);

// export webpack config
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        path: __dirname + '/www',
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
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader?name=[path][name].[ext]"
            },
			{
				test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
				loader: 'url-loader'
			}
        ]
    },
    // initialize the added webpack plugins
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        HTMLWebpackPluginConfig,
		new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        CopyPluginResConfig
    ]
};
