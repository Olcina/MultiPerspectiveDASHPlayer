const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourceMaps = require('gulp-sourcemaps');
const util = require('gulp-util');
const handlebars = require('gulp-handlebars');
const through = require('through2');
const defineModule = require('gulp-define-module');
const rename = require('gulp-rename');
const del = require('del');
const server = require('gulp-develop-server');
const runSequence = require('run-sequence');

gulp.task('clean', function (done) {
    return del(['build'], done);
});

gulp.task('compile-sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('build/css'))
        .pipe(gulp.dest('src/css'))
})

gulp.task('copy-bootstrap', function () {
    return gulp.src(['src/css/bootstrap.min.css', 'src/css/bootstrap.min.css.map'])
        .pipe(gulp.dest('build/css'))
})

gulp.task('copy-jslibs', function () {
    return gulp.src(['src/js/dash.all.min.js', 'src/js/jquery-3.2.1.js','src/js/bootstrap.js'])
        .pipe(gulp.dest('build/js'))
})

gulp.task('scripts-dist', function () {
    return gulp.src(['src/js/layouter.js',
        'src/js/custom_player.js',
        'src/js/modalSelector.js',
        'src/js/main.js',
        'src/js/keyBindings.js',])
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('build/js/'))
})

gulp.task('copy-sw', function () {
    return gulp.src('src/sw/*.js')
        .pipe(gulp.dest('build/sw'))
})

gulp.task('templates', function () {
    return gulp.src('src/templates/*.hbs')
        .pipe(handlebars())
        .on('error', util.log.bind(util))
        .pipe(through.obj(function (file, enc, callback) {
            // Don't want the whole lib
            file.defineModuleOptions.require = { Handlebars: 'handlebars/runtime' };
            callback(null, file);
        }))
        .pipe(defineModule('commonjs'))
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('build/templates'));
});


gulp.task('copy-index', function(){
    return gulp.src('src/index.js')
        .pipe(gulp.dest('build'))
})



gulp.task('serve', function (callback) {
    runSequence('clean', 'copy-index','copy-jslibs', 'copy-sw', 'copy-bootstrap', 'compile-sass', 'scripts-dist', 'templates','server:start', callback);
});


gulp.task('copy-html', function () {
    gulp.src('src/*.html')
    .pipe(gulp.dest('build/'))
    
})

gulp.task('copy-css', function(){
    gulp.src('src/css/*')
    .pipe(gulp.dest('build/'))
})

gulp.task('scripts', function () {
    gulp.src(['src/js/layouter.js',
            'src/js/custom_player.js',
            'src/js/modalSelector.js',
            'src/js/main.js',
            'src/js/keyBindings.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js'))
})

gulp.task('trasnpile', function () {
    gulp.src('src/js/all.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('build/js/'))
})









// run server
gulp.task('server:start', function () {
    server.listen({ path: 'build/index.js' });
});

// restart server if app.js changed
gulp.task('server:restart', function () {
    gulp.watch(['index.js'], server.restart);
});



gulp.task('default', ['clean', 'copy-index', 'copy-sw', 'copy-bootstrap', 'compile-sass', 'script-dist', 'templates'], function () {
    gulp.watch('src/sass/**/*.scss', ['css'])
    gulp.watch('src/*.html', ['copy-html'])
})