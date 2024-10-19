const { BytenodeWebpackPlugin } = require("@herberttn/bytenode-webpack-plugin");

module.exports = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    // entry: './src/main.js',
    // Put your normal webpack config below here
    module: {
        rules: require("./webpack.rules"),
    },

    entry: { index: "./src/main.js" },
    output: {
        filename: "[name].js",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    // module: {
    //   rules,
    // },
    plugins: [new BytenodeWebpackPlugin({ compileForElectron: true })],
    target: "electron-main",
};
