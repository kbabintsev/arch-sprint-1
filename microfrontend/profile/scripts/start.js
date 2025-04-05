process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.BROWSER = 'none';
process.env.PORT = '3004';
require('./overrides/webpack-config');
require('react-scripts/scripts/start');