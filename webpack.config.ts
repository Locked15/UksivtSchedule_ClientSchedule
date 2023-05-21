// eslint-disable-next-line import/no-import-module-exports
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Client Schedule',
    }),
  ],
};
