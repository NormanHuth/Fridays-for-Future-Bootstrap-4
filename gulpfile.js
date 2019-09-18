const gulp            = require('gulp');
const sass            = require('gulp-sass');
const postcss         = require('gulp-postcss');
const jsminify        = require('gulp-terser');
const flexbugsfixes   = require('postcss-flexbugs-fixes');
const autoprefixer    = require('autoprefixer');
const cssminify       = require('gulp-clean-css');
const include         = require('gulp-include');

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

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(cssminify())
        .pipe(gulp.dest(paths.styles.dest));
}
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(include())
        .pipe(jsminify())
        .pipe(gulp.dest(paths.scripts.dest));
}

exports.styles            = styles;
exports.scripts           = scripts;