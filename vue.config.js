const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const circularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = {
  chainWebpack (config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(
      new circularDependencyPlugin({
        exclude: /node_modules/,
      }),
    )
  },
}
