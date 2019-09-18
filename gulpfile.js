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

function OnlyStyles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(cssminify())
        .pipe(gulp.dest(paths.styles.dest));
}
function OnlyJS() {
    return gulp.src(paths.scripts.src)
        .pipe(include())
        .pipe(jsminify())
        .pipe(gulp.dest(paths.scripts.dest));
}

exports.build = series(OnlyStyles, OnlyJS);

exports.watch = function() {
    watch(paths.styles.src, OnlyStyles);
    watch(paths.scripts.src, series(OnlyJS));
};

exports.OnlyStyles            = OnlyStyles;
exports.OnlyJS           = OnlyJS;