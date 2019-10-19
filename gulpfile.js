const { series, parallel, src, dest, watch } = require('gulp');

const paths = {
  build: 'public',
  scss: 'src/scss',
  js: 'src/js',
  html: 'src/views',
  server: 'server.js'
};

const del = require('del');
function clean() {
  return del(paths.build);
}
exports.clean = clean;

function html() {
  return src(paths.html + '/**/*.html')
    .pipe(dest(paths.build));
}
exports.html = html;

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
function css() {
  return src(paths.scss + '/**/*.scss', { sourcemaps: true })
    .pipe(
      sass({
        includePaths: [paths.scss + '/', 'node_modules/'],
        outputStyle: 'expanded'
      }).on('error', function error (e) {
        console.log(e.message);
        this.emit('end');
      })
    )
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(dest(paths.build + '/css', { sourcemaps: true }));
}
exports.css = css;


const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
function js() {
  return src(paths.js + '/index.js', { sourcemaps: true })
    .pipe(rollup({
      plugins: [
        babel(),
        resolve(),
        commonjs()
      ]
    }, 'umd'))
    .pipe(dest(paths.build + '/js', { sourcemaps: true }));
}
exports.js = js;

const nodemon = require('gulp-nodemon');
function server(done) {
  let called = false;
  return nodemon({
    script: paths.server,
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'src/',
      'public/'
    ]
  }).on('start', function() {
    if(!called) {
      called = true;
      done();
    }
  });
}
exports.server = server;

const browsersync = require('browser-sync');
function _browsersync(done) {
  browsersync({
    // server: {
    //   baseDir: paths.build
    // },
    notify: true,
    proxy: 'localhost:3000',
    port: 5000,
    files: [
      paths.build + '/**/*.*'
    ]
  });
  done();
}
function _watch(done) {
  watch(paths.scss + '/**/*.scss', parallel(css))
    .on('change', function() {
      browsersync.reload({ stream: true });
    });

  watch(paths.js + '/**/*.js', parallel(js))
    .on('change', browsersync.reload);

  watch(paths.html + '/**/*.html', parallel(html))
    .on('change', browsersync.reload);
  done();
}
exports.watch = parallel(_watch, _browsersync);

exports.default = series(
  clean,
  parallel(html, js, css),
  server,
  _browsersync,
  _watch
);
