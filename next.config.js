const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const webpack = require('webpack');
const cookieUniversalNuxt = require('cookie-universal-nuxt');
const path = require('path');

module.exports = withPlugins([[withImages]], {
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  axios: {
    baseURL: 'https://protected-scrubland-94267.herokuapp.com/',
  },
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
});
