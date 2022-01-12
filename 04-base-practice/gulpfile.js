var gulp = require("gulp");
var concat = require("gulp-concat");

function concatCssAndCopy() {
  return gulp
    .src("src/styles/*.css")
    .pipe(concat("styles/style.css"))
    .pipe(gulp.dest("build/"));
}

function copyHtml() {
  return gulp.src("src/templates/*.html").pipe(gulp.dest("build/"));
}

exports.default = gulp.parallel(concatCssAndCopy, copyHtml);
