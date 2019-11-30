const { src, dest, series, parallel, watch } = require("gulp");
const plumber = require("gulp-plumber");
const del = require("del");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cmq = require("css-mqpacker");
const sass = require("gulp-sass");
const spriter = require("gulp-svg-symbol-sprite");
const rename = require("gulp-rename");
const csso = require("gulp-csso");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const build = series(clean, copy, sprite, parallel(css, js), html);

function html() {
  return src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(dest("dist"));
}

function css() {
  return src("source/scss/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(postcss([cmq({ sort: true }), autoprefixer()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/css", { sourcemaps: true }))
    .pipe(browserSync.stream());
}

function js() {
  return src("source/js/*", { sourcemaps: true })
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/js", { sourcemaps: true }));
}

function sprite() {
  return src(['source/img/*.svg'])
    .pipe(spriter({
        svg: 'sprite.svg'
    }))
    .pipe(dest('dist/img'));
}

function copy() {
  return src(["source/img/*", "source/fonts/*"], { base: "source" }).pipe(
    dest("./dist")
  );
}

function clean() {
  return del("dist");
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  watch("source/*.html", series(html, refreshPage));
  watch("source/scss/**/*", css);
  watch("source/js/**/*", series(js, refreshPage));
}

function refreshPage(done) {
  browserSync.reload();
  done();
}

exports.default = series(build, server);
exports.build = build;
exports.clean = clean;
