const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const Plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/app-shell/index.ejs',
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
    preload: /\.js$/,
  }),
];

module.exports = () => ({
  entry: path.resolve(__dirname, './src/components/Example.tsx'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-[hash:8].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: Plugins,
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        include: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, './../src'), // Local module
          path.resolve(__dirname, './node_modules/@taisuke-j/react-grid-view'), // Node module
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/react',
            '@babel/typescript',
            ['@babel/env', { modules: false }],
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
          ],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.ejs$/,
        use: 'ejs-compiled-loader',
      },
    ],
  },
});
