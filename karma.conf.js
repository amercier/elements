module.exports = function(config) {

  config.set({
    frameworks: ['browserify', 'mocha', 'sinon-chai'],

    // Source and test files
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],

    // ES6 => CJS => ES5 pre-processsing
    browserify: {
      debug: true,
      transform: [
        ['browserify-istanbul', {
          instrumenter: require('isparta'),
          ignore: ['**/*.spec.js', '**/bower_components/**', '**/node_modules/**']
        }],
        ['babelify', {
          'stage': 0,
          'optional': ['es7.asyncFunctions'],
          'ignore': ['./node_modules', './bower_components']
        }]
      ]
    },
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },

    // Browser configuration
    browsers: ['PhantomJS'],

    // Enable Mocha HTML reported
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    reporters: ['progress', 'coverage']
  });

};
