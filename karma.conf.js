/* eslint-env node */
/* eslint camelcase: 0, no-process-env: 0, no-var: 0 */

var isContinuousIntegration = process.env.CI === 'true';

/**
 * Karma test runner configuration
 * ===============================
 *
 * See http://karma-runner.github.io/
 *
 * @param {Object} config Karma configuration object
 */
module.exports = function(config) {

  // var istanbulify = ['browserify-istanbul', {
  //     instrumenter: require('isparta'),
  //     ignore: ['**/*.spec.js', '**/bower_components/**', '**/node_modules/**']
  //   }],
  //   babelify = ['babelify', {
  //     stage: 0,
  //     ignore: ['./node_modules', './bower_components']
  //   }];

  config.set({
    singleRun: isContinuousIntegration,
    autoWatch: !isContinuousIntegration,

    frameworks: [/*'browserify',*/ 'mocha', 'sinon-chai'],

    // Source and test files
    files: [
      { pattern: 'src/**/*.js', watched: true, included: true, served: true },
      { pattern: 'test/**/*.js', watched: true, included: true, served: true },
      'test/**/*.html'
    ],

    proxies: {
      '/base/src/': 'http://localhost:4200/src/',
      '/base/test/': 'http://localhost:4200/test/',
    },

    // Pre-processing:
    // - ES6 [=> Istanbul] => CJS => ES5
    // - HTML => JS
    // browserify: {
    //   debug: true,
    //   transform: isContinuousIntegration ? [istanbulify, babelify] : [babelify]
    // },
    preprocessors: {
      '**/*.html': ['html2js']//,
      // 'src/**/*.js': ['broccoli'],
      // 'test/**/*.js': ['broccoli']
    },

    // Browser configuration
    browsers: isContinuousIntegration ? ['PhantomJS', 'ChromeTravisCI', 'Firefox'] : ['PhantomJS'],
    customLaunchers: {
      PhantomJSDebug: {
        base: 'PhantomJS',
        debug: true
      },
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Reporters
    reporters: isContinuousIntegration ? ['dots', 'coverage'] : ['progress'],
    client: {
      mocha: {
        reporter: 'html' // Enable Mocha HTML reporter
      }
    },
    coverageReporter: {
      reporters: [
        { type: 'json' },
        { type: 'html' }
      ]
    }
  });
};
