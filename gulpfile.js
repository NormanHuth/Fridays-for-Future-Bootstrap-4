const gulp              = require('gulp');
const sass              = require('gulp-sass');
const postcss           = require('gulp-postcss');
const jsminify          = require('gulp-terser');
const flexbugsfixes     = require('postcss-flexbugs-fixes');
const autoprefixer      = require('autoprefixer');
const cssminify         = require('gulp-clean-css');
const include           = require('gulp-include');
const { watch, series } = require('gulp');

const processors = [
    flexbugsfixes,
    autoprefixer({
        browsers: ['last 2 versions','> 0.1%']
    })
];

const paths = {
    styles: {
        src: 'assets/scss/src/*.scss',
        dest: 'docs/src/css/'
    },
    scripts: {
        src: 'assets/js/src/*.js',
        dest: 'docs/src/js/'
    },
};

function BuildCSS() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(cssminify())
        .pipe(gulp.dest(paths.styles.dest));
}
function DevCSS() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.styles.dest));
}
function BuildJS() {
    return gulp.src(paths.scripts.src)
        .pipe(include())
        .pipe(jsminify())
        .pipe(gulp.dest(paths.scripts.dest));
}
function DevJS() {
    return gulp.src(paths.scripts.src)
        .pipe(include())
        .pipe(gulp.dest(paths.scripts.dest));
}

exports.Build = series(BuildJS, BuildCSS);

exports.BuildCSS        = BuildCSS;
exports.BuildJS         = BuildJS;

exports.Dev             = series(DevJS, DevCSS);
exports.DevCSS          = DevCSS;
exports.DevJS           = DevJS;

exports.Watch = function() {
    watch(paths.styles.src, DevCSS);
    watch(paths.scripts.src, DevJS);
};
exports.WatchCSS = function() {
    watch(paths.styles.src, DevCSS);
};
exports.WatchJS = function() {
    watch(paths.scripts.src, DevJS);
};