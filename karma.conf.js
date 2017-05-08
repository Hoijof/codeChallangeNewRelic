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
      'test/**/*.js': ['browserify']
    },

    browserify: {
      debug: false,
      transform: [['babelify', {presets: ['es2015']}]]
    },

    browsers : ['Chrome', 'Firefox', 'Opera', 'Safari']
    // define reporters, port, logLevel, browsers etc.
  });
};