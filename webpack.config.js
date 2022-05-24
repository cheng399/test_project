const path = require('path')

// 1. 导入 html-webpack-plugin 这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
    // 2. new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个页面
    template: './src/PC端/index.html',
    // 指定复制出来的文件名和存放路径
    filename: './index.html'
})

// 注意：左侧的 {} 是 解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // eval-source-map 仅限在“开发模式”下使用，不建议在“生产模式”下使用。
    // devtool 的值设置为 nosources-source-map，可只定位报错的具体行数，且不暴露源码。
    // 此选项生成的 Source Map 能够保证“运行时报错的行数”与“源代码的行数“保持一致
    // 在实际发布的时候，建议大家把 devtool 的值设置为 nosource-source-map 或直接关闭 SourceMap
    devtool: 'nosources-source-map',
    // mode 用来指定构建模式，可选值有 development 和 production
    // 结论：开发的时候一定要用 development 因为追求的是打包的速度，而不是体积
    // 反过来，发布上线的时候一定要用 production，因为上线追求的是体积小，而不是打包速度快！
    mode: 'development',
    // entry:'指定要处理哪个文件'
    entry: path.join(__dirname, './src/PC端/js/index.js'),
    // output: 指定生成的文件要存放在哪里
    output: {
        // 存放的目录
        path: path.join(__dirname, 'dist'),
        // 生成的文件名
        filename: 'js/bundle.js'
    },
    // 3.插件的数组，将来 webpack 在运行时，会加载并调用这些插件
    plugins: [htmlPlugin, new CleanWebpackPlugin()],
    devServer: {
        open: true, // 初次打包完成后，自动打开浏览器
        host: '127.0.0.1', // 实时打包所使用的主机地址
        port: 80 // 实时打包所使用的端口号
    },
    module: {
        rules: [
            // 定义了不同模块对应的 loader
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理 .sass 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            // 处理图片文件的 loader
            // 如果需要调用的 loader 只有一个，则只传递一个字符串也行，如果有多个 loader 则必须指定数组
            // limit 用来指定图片的大小，单位是字节 只有小于等于 limit 大小的图片，才会转为 base64 格式的图片
            // outputPath 用来指定打包发布时图片的路径
            // 在配置 url-loader 的时候，多个参数之间，使用 & 符号进行分隔
            { test: /\.jpg|png|gif$/, use: 'url-loader?limit=1000&outputPath=images' },
            // 使用 babel-loader 处理高级的 JS 语法
            // 在配置 babel-loader 的时候，程序员只需把自己的代码进行转换即可，一定要排除 node_modules目录中的 JS 文件，因为第三方包中的 JS 兼容性，不需要程序员关心
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        alias: {
            // 告诉 webpack，程序员写的代码中，@符号表示 src 这一层目录
            '@': path.join(__dirname, './src/')
        }
    }
}