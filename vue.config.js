/* eslint-disable no-param-reassign */
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // Set custom title for application.
      args[0].title = 'Client Schedule';
      return args;
    });
  },
});
