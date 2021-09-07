const path = require("path"); //nodejs内置模块
const resolve = (url) => path.resolve(__dirname, url); // 定义resolve

module.exports = {
    // 入口
    entry: "./lib/hdmn.js",

    // 输出
    output: {
        path: resolve("dist"), // 输出路径
        filename: "bundle.js", // 打包文件名
    },

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
        ],
    },
};
