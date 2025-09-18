const { dependencies } = require('./package.json');

module.exports = {
  name: 'components',
  exposes: {
    './PopupWithForm': './src/components/PopupWithForm'
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
