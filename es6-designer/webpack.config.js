const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // 这个插件主要是生成一个html文件，自动将依赖注入html模板，并输出最终的html文件到目标文件夹
        new HtmlWebpackPlugin({
            filename: 'index.html',
            //favicon: path.resolve(__dirname, 'favicon.ico'),
            template: './src/index.html',
            // 将所有的静态文件都插入到body文件的末尾
            inject: true
        })
    ]
};