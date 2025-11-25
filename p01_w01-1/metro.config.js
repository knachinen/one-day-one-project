const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 'txt' to the list of asset extensions
config.resolver.assetExts.push('txt');

module.exports = config;
