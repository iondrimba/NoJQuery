module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });

  grunt.initConfig({
    browserSync: require('./tasks/browsersync')().target,
    uglify: require('./tasks/uglify')().target,
    compress: require('./tasks/compress')().target,
    watch: require('./tasks/watch')().target,
    copy: require('./tasks/copy')().target,
    eslint: require('./tasks/eslint')().target,
    coveralls: require('./tasks/coveralls')().target
  });

  grunt.registerTask('build', ['eslint', 'copy', 'uglify', 'compress']);
  grunt.registerTask('default', ['eslint', 'browserSync', 'watch']);
};
