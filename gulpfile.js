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
const developServer = require('gulp-develop-server');
const runSequence = require('run-sequence');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


// Clean the folder build to start fresh
gulp.task('clean', function (done) {
    return del(['build'], done);
});


// Compile the files in the sass folder into compresed css with prefixes for browsers
// copy the processed files into the src and build folders
gulp.task('compile-sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourceMaps.write('./'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(gulp.dest('src/css'))
})


// Copy the bootstrap css lib into the css build folder
gulp.task('copy-bootstrap', function () {
    return gulp.src(['src/css/bootstrap.min.css', 'src/css/bootstrap.min.css.map'])
        .pipe(gulp.dest('build/css'))
})

//  Copy the external jslibs into the build folder
gulp.task('copy-jslibs', function () {
    return gulp.src(['src/js/dash.all.min.js', 'src/js/jquery-3.2.1.js','src/js/bootstrap.js'])
        .pipe(gulp.dest('build/js'))
})

//  concatenation and transpiling of the js files into the 'all.js' file to be load as an HTML script
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


// Copy the SW folder into the Build
gulp.task('copy-sw', function () {
    return gulp.src('src/sw/*.js')
        .pipe(gulp.dest('build/sw'))
})

// Precompile the templates into .js files to be inyected in the browser
gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.hbs')
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

// Copy the index.js file into the build
gulp.task('copy-index', function(){
    return gulp.src('src/index.js')
        .pipe(gulp.dest('build'))
})

// run  the server and watch for changes in the build js files
// it restarts the server and load the latest features in case of changes
gulp.task('server', function () {
    developServer.listen({ path: 'build/index.js' });
    gulp.watch([
        'build/**/*.js'
    ], developServer.restart);
});


// Watchers for the src folder
gulp.task('watch', function () {
    gulp.watch(['src/scss/*.scss'], ['compile-sass']);
    gulp.watch(['src/templates/**/*.hbs'], ['templates']);
    gulp.watch(['src/sw/*.js'], ['copy-sw']);
    gulp.watch(['src/js/*.js'], function () { runSequence('scripts-dist', 'browserifing') });
    gulp.watch(['src/index.js'], ['copy-index']);
});


gulp.task('browserifing', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './build/js/all.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('all.js'))
        .pipe(buffer())
        .pipe(sourceMaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('./build/js/'));
});

// Concatenation of the build process to make it available into npm
gulp.task('serve', function (callback) {
    runSequence('clean', 'copy-index', 'copy-jslibs', 'copy-sw', 'copy-bootstrap', 'compile-sass', 'scripts-dist','browserifing','templates','server','watch', callback);
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


gulp.task('default', ['clean', 'copy-index', 'copy-sw', 'copy-bootstrap', 'compile-sass', 'script-dist', 'templates'], function () {
    gulp.watch('src/sass/**/*.scss', ['css'])
    gulp.watch('src/*.html', ['copy-html'])
})