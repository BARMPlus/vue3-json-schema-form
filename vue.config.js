const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const circularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circular').use(
      new circularDependencyPlugin({
        exclude: /node_modules/,
      }),
    )
  },
}
