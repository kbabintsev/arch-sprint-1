const { dependencies } = require('./package.json');

module.exports = {
  name: 'places',
  remotes: {
    components: 'components@http://localhost:3001/remoteEntry.js'
  },
  exposes: {
    './Places': './src/components/Places'
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
