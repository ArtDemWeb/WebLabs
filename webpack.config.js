const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: '/node_modules/index.js',
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.html$/, use: 'html-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin({ 
            patterns: [
                { from: '../lab2front/styles.css', to: 'styles.css' }, 
                { from: '../lab2front/script.js', to: 'script.js' },
                { from: '../lab2front/task3.html', to: 'task3.html' }
            ]
        })
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}