module.exports = function (config) {
  config.set({

    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
      'app/scripts/classes/*.js',
      'app/scripts/services/*.js',
      'test/**/*.js'
    ],

    exclude: [],

    preprocessors: {
      'app/scripts/classes/*.js': ['browserify'],
      'app/scripts/services/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [['babelify', {presets: ['es2015']}]]
    }

    // define reporters, port, logLevel, browsers etc.
  });
};