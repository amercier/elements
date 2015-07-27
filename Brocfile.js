/* eslint-env node */
/* eslint camelcase: 0, no-process-env: 0, no-var: 0 */

var funnel = require('broccoli-funnel'),
  mergeTrees = require('broccoli-merge-trees'),
  renameFiles = require('broccoli-rename-files'),
  uglify = require('broccoli-uglify-js'),
  babel = require('broccoli-babel-transpiler'),
  browserify = require('broccoli-fast-browserify'),
  sourceMap = require('broccoli-source-map'),
  stew = require('broccoli-stew'),
  chalk = require('chalk'),
  filesize = require('filesize'),
  zlib = require('zlib');

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

function displaySize(content, relativePath) {
  var gzipped = zlib.gzipSync(new Buffer(content));
  process.stdout.write(
    chalk.yellow(relativePath)
    + ' => ' + chalk.green(filesize(content.length))
    + ' ' + chalk.grey('(' + filesize(gzipped.length) + ' gzipped)\n')
  );
  return content;
}

jsTree = mergeTrees([
  funnel(jsTree, { exclude: ['**/*.js'] }),
  stew.map(funnel(jsTree, { include: ['**/*.js'] }), displaySize)
]);

module.exports = jsTree;
