var fastBrowserify = require('broccoli-fast-browserify');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var htmlFiles = pickFiles('app', {
  srcDir: '/',
  files: ['index.html'],
  destDir: '/'
});

var browserifyTree = fastBrowserify('app', {
  bundles: {
    "js/build.js": {
      transform: require('reactify'),
      entryPoints: ['main.js']
    },
  },
  browserify: {
    debug: false,
    standalone: 'App'
  }
});

module.exports = mergeTrees([htmlFiles, browserifyTree]);
