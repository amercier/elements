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
      transform: ['babelify']
    },
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      }
    },

    // Browser configuration
    browsers: ['PhantomJS'],

    // Enable Mocha HTML reported
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });

};
