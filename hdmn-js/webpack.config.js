const path = require("path"); //nodejs内置模块
const resolve = (url) => path.resolve(__dirname, url); // 定义resolve

module.exports = {
    // 模式  development production none
    mode: "development",
    // 入口
    entry: "./lib/hdmn.js",

    // 输出
    output: {
        path: resolve("dist"), // 输出路径
        filename: "hdmn.js", // 打包文件名
    },

    // 设置几个别名
    resolve: {
        alias: {
            "@hdmn-node": resolve("node_modules"),
            "@hdmn-diagram-node": resolve("hdmn-diagram-js/node_modules"),
            "@hdmn": resolve("./"),
            "@hdmn-diagram": resolve("hdmn-diagram-js"),
        },
    },

    // 模块 规则 xx-loader
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
};
