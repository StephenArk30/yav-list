const path = require('path');

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      packageDir: [path.resolve(__dirname), path.resolve(__dirname, '../..')],
    }],
  },
};
