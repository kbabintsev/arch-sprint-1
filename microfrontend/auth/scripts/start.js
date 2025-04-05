process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.BROWSER = 'none';
require('./overrides/webpack-config');
require('react-scripts/scripts/start');