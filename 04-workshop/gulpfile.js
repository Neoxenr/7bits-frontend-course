var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var path = {
  css: './src/**/*.css',
  html: {
    pages: './src/pages/**/*.hbs',
    components: './src/components/**/*.hbs',
    componentsPath: './src/components/'
  },
  images: './src/**/images/*',
  build: {
    root: './build/**',
    css: './build/styles',
    html: './build/',
    images: './build/images/'
  }
};

gulp.task('html', function () {
  return gulp.src(path.html.pages)
    .pipe(handlebars({}, {
      ignorePartials: true,
      batch: path.html.componentsPath
    }))
    .pipe(rename({
      dirname: '.',
      extname: '.html'
    }))
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest(path.build.images));
});

gulp.task('watch', function () {
  gulp.watch(path.html.pages, gulp.parallel('html'));
  gulp.watch(path.html.components, gulp.parallel('html'));
  gulp.watch(path.css, gulp.parallel('css'));
  gulp.watch(path.images, gulp.parallel('images'));
});

gulp.task('hotReload', function () {
  browserSync.init({
    server: {
      baseDir: path.build.html
    },
    port: 3000,
    notify: false
  });
  gulp.watch(path.build.root).on('change', browserSync.reload);
});

gulp.task('prod', gulp.parallel('html', 'css', 'images'));

gulp.task('default', gulp.parallel('html', 'css', 'images', 'watch', 'hotReload'));