const {dependencies} = require('./package.json');

module.exports = {
    name: 'auth',
    remotes: {
        components: 'components@http://localhost:3001/remoteEntry.js'
    },
    exposes: {
        './Auth': './src/components/Auth',
        './SignOut': './src/components/SignOut'
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
        'react-redux': {
            singleton: true,
            requiredVersion: dependencies['react-redux'],
        }
    },
};
