// I don't feel like writing var everytime
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    log = require('fancy-log');

var paths = {
    styles: {
        src: 'styles/**/*.scss',
        dest: 'public/styles'
    }
};

function style() {
    log.info('Starting style!');
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('.'))
            .pipe(size())
            .pipe(gulp.dest(paths.styles.dest))
    );
}
exports.style = style;

function minify() {
    log.info('Starting minify!');
    return (
        gulp
            .src(paths.styles.dest+'/style.css')
            .pipe(sourcemaps.init())
            .pipe(postcss([cssnano()]))
            .pipe(size())
            .pipe(size({
                gzip: true
            }))
            .pipe(concat('style.min.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.styles.dest))
    );
}
exports.minify = minify;

function watch(){
    log.info('Starting watch!');
    gulp.watch(paths.styles.src, gulp.series('style', 'minify'))
}
exports.watch = watch;

function start(){
    watch();
}
exports.default = start;
