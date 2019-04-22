const path = require('path')
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

// module.exports = withSass()
module.exports = withCSS(withSass(withImages()))