var webpack = require("webpack");
module.exports = {
    entry:{app:["webpack/hot/dev-server",__dirname + "/app/js/main.js"]
    },
    output:{
        path:__dirname + "/build",
        filename:"[name].js"
    },
    module:{ //模块 有很多加载器
        loaders:[ //安装每一个加载器 每一个加载器都是一个对象
            {
                test:/\.js$/,
                exclude:/node_modules/, //文件不进行编译
                loader:"babel-loader", //编写js文件 转换es6
            },
            {
                test:/\.less$/,
                loader:"style-loader!css-loader!less-loader"
            },
            {
                test:/\.(jpg|png)$/,
                loader:"url-loader?limit=10000000000000"
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
        	compress:{
        		warnings:false,
        		drop_console:false
        	}
        })
    ]
}