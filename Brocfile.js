/* eslint-env node */
/* eslint camelcase: 0, no-process-env: 0, no-var: 0 */

var funnel = require('broccoli-funnel'),
  mergeTrees = require('broccoli-merge-trees'),
  renameFiles = require('broccoli-rename-files'),
  uglify = require('broccoli-uglify-js'),
  babel = require('broccoli-babel-transpiler'),
  browserify = require('broccoli-fast-browserify'),
  sourceMap = require('broccoli-source-map'),
  fileSize = require('broccoli-file-size');

var name = 'elementjs';

var jsTree = funnel('src', {
  include: ['**/*.js']
});

jsTree = babel(jsTree, {
  modules: 'common',
  sourceMaps: 'inline'
});

jsTree = browserify(jsTree, {
  bundles: {
    'elements.js': {
      entryPoints: ['elements.js']
    }
  },
  browserify: {
    standalone: name,
    debug: true
  }
});

jsTree = mergeTrees([
  sourceMap.extract(jsTree),
  renameFiles(uglify(jsTree), { append: '.min' })
]);

jsTree = mergeTrees([
  funnel(jsTree, { exclude: ['**/*.js'] }),
  fileSize(funnel(jsTree, { include: ['**/*.js'] }))
]);

module.exports = jsTree;
