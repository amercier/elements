var isContinuousIntegration = process.env.CI === 'true';

var istanbulify = ['browserify-istanbul', {
    instrumenter: require('isparta'),
    ignore: ['**/*.spec.js', '**/bower_components/**', '**/node_modules/**']
  }],
  babelify = ['babelify', {
    'stage': 0,
    'ignore': ['./node_modules', './bower_components']
  }];

module.exports = function(config) {

  config.set({
    singleRun: isContinuousIntegration,
    autoWatch: !isContinuousIntegration,

    frameworks: ['browserify', 'mocha', 'sinon-chai'],

    // Source and test files
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],

    // ES6 => CJS => ES5 pre-processsing
    browserify: {
      debug: true,
      transform: isContinuousIntegration ? [istanbulify, babelify] : [babelify]
    },
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },

    // Browser configuration
    browsers: ['PhantomJS'],

    // Reporters
    reporters: isContinuousIntegration ? ['dots', 'coverage'] : ['progress'],
    client: {
      mocha: {
        reporter: 'html' // Enable Mocha HTML reporter
      }
    },
    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { subdir: '.', type: 'html' },
        { subdir: '.', type: 'lcovonly' }
      ]
    }
  });
};
