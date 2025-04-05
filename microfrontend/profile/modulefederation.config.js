const { dependencies } = require('./package.json');

module.exports = {
  name: 'profile',
  remotes: {
    components: 'components@http://localhost:3001/remoteEntry.js'
  },
  exposes: {
    './Profile': './src/components/Profile'
  },
  filename: 'remoteEntry.js',
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
  },
};
