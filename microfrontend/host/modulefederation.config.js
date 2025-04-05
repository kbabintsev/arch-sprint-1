const { dependencies } = require('./package.json');

module.exports = {
  name: 'host',
  remotes: {
    auth: 'auth@http://localhost:3002/remoteEntry.js',
    places: 'places@http://localhost:3003/remoteEntry.js',
    profile: 'profile@http://localhost:3004/remoteEntry.js',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    'react-redux': {
      singleton: true,
      requiredVersion: dependencies['react-redux'],
    }
  },
};
