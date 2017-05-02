module.exports = function (config) {
  config.set({

    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'app/**/*.js',
      'test/**/*.js'
    ],

    exclude: [],

    preprocessors: {
      'app/**/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [['babelify', {presets: ['es2015']}]]
    }

    // define reporters, port, logLevel, browsers etc.
  });
};