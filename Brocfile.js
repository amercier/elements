/* eslint-env node */
/* eslint camelcase: 0, no-process-env: 0, no-var: 0 */

var env = process.env.BROCCOLI_ENV || 'development';

var funnel = require('broccoli-funnel'),
  mergeTrees = require('broccoli-merge-trees'),
  renameFiles = require('broccoli-rename-files'),
  uglify = require('broccoli-uglify-js'),
  babel = require('broccoli-babel-transpiler'),
  stew = require('broccoli-stew'),
  browserify = require('broccoli-fast-browserify')
  isparta = require('isparta');

var instrumenter = new isparta.Instrumenter();

var jsTree = funnel('src', {
  include: ['**/*.js']
});

if (env === 'testing') {

  // Test files
  jsTree = mergeTrees([
    funnel(jsTree, {
      destDir: 'src'
    }),
    funnel('test', {
      include: ['**/*.js'],
      destDir: 'test'
    })
  ]);

  // Code coverage intrumentation
  jsTree = stew.map(jsTree, function(content) {
    return instrumenter.instrumentSync(content);
  });
}

// Babel
jsTree = babel(jsTree, {
  modules: 'common',
  sourceMaps: 'inline'
});

if (env === 'production') {

  // Browserify
  jsTree = browserify(jsTree, {
    bundles: {
      'elements.js': {
        entryPoints: ['elements.js']
      }
    },
    browserify: {
      standalone: 'elementjs',
      debug: true
    }
  });

  // UglifyJS2
  jsTree = mergeTrees([
    jsTree,
    renameFiles(uglify(jsTree), {
      append: '.min'
    })
  ]);
}

module.exports = jsTree;
