var gulp = require("gulp");
var concat = require("gulp-concat");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var order = require("gulp-order");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");
var cssnano = require("gulp-cssnano");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var svgSprite = require("gulp-svg-sprite");

var path = {
  css: "./src/**/*.css",
  html: {
    pages: "./src/pages/**/*.hbs",
    components: "./src/components/**/*.hbs",
    componentsPath: "./src/components/",
  },
  images: "./src/**/images/*.+(jpg|ico)",
  icons: "./src/**/images/**/*.svg",
  build: {
    root: "./build/**",
    css: "./build/styles",
    html: "./build/",
    images: "./build/images/",
  },
};

var svgConfig = {
  shape: {
    dimension: {
      maxWidth: 500,
      maxHeight: 500,
    },
    spacing: {
      padding: 0,
    },
    transform: [
      {
        svgo: {
          plugins: [
            { removeViewBox: false },
            { removeUnusedNS: false },
            { cleanupIDs: false },
            { removeComments: true },
            { removeEmptyAttrs: true },
            { removeEmptyText: true },
            { collapseGroups: true },
            { removeAttrs: { attrs: "(stroke|style)" } },
          ],
        },
      },
    ],
  },
  mode: {
    stack: {
      dest: ".",
      sprite: "sprite.svg",
    },
  },
};

gulp.task("html", function () {
  return gulp
    .src(path.html.pages)
    .pipe(
      handlebars(
        {},
        {
          ignorePartials: true,
          batch: path.html.componentsPath,
        }
      )
    )
    .pipe(
      rename({
        dirname: ".",
        extname: ".html",
      })
    )
    .pipe(gulp.dest(path.build.html));
});

gulp.task("css", function () {
  return gulp
    .src(path.css)
    .pipe(sourcemaps.init())
    .pipe(
      order([
        "**/normalize.css",
        "**/pages/**/*.css",
        "**/layout/**/*.css",
        "**/header/**/*.css",
        "**/footer/**/*.css",
      ])
    )
    .pipe(concat("main.css"))
    .pipe(postcss([autoprefixer()]))
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.build.css));
});

gulp.task("images", function () {
  return gulp
    .src(path.images)
    .pipe(
      rename({
        dirname: ".",
      })
    )
    .pipe(gulp.dest(path.build.images));
});

gulp.task("icons", function () {
  return gulp
    .src(path.icons)
    .pipe(
      rename({
        dirname: ".",
      })
    )
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(path.build.images));
});

gulp.task("watch", function () {
  gulp.watch(path.html.pages, gulp.parallel("html"));
  gulp.watch(path.html.components, gulp.parallel("html"));
  gulp.watch(path.css, gulp.parallel("css"));
  gulp.watch(path.images, gulp.parallel("images"));
});

gulp.task("hotReload", function () {
  browserSync.init({
    server: {
      baseDir: path.build.html,
    },
    port: 3000,
    notify: false,
  });
  gulp.watch(path.build.root).on("change", browserSync.reload);
});

gulp.task("prod", gulp.parallel("html", "css", "images", "icons"));

gulp.task(
  "default",
  gulp.parallel("html", "css", "images", "icons", "watch", "hotReload")
);
