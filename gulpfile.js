/**
 * Created by stu on 4/27/17.
 */
var gulp = require('gulp');
var map = require('map-stream');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
const jasmine = require('gulp-jasmine');
var rev = require('gulp-rev-append');
var bump = require('gulp-bump');
var git = require('gulp-git');
var htmlLint = require('gulp-html-lint');
const imagemin = require('gulp-imagemin');
var htmlreplace = require('gulp-html-replace');
var ghPages = require('gulp-gh-pages');



///HELPERS///

var exitOnJshintError = map(function (file, cb) { // http://stackoverflow.com/questions/27852814/gulp-jshint-how-to-fail-the-build
    if (!file.jshint.success) {
        console.error('jshint failed'); //USED WITH lint TASK
        process.exit(1);
    }
});

///HTML///

gulp.task('htmlLinter', function() {
    return gulp.src('./src/html/*.html')
        .pipe(htmlLint.format())
        .pipe(htmlLint.failOnError());
});

gulp.task('replaceFileRefs',['htmlLinter'], function() {
    gulp.src('./src/html/index.html')
        .pipe(htmlreplace({
            'css': '../styles/bundle.min.css',
            'js': '../scripts/all.js'
        }))
        .pipe(gulp.dest('./dest/html/'));
});


gulp.task('html',['htmlLinter',"replaceFileRefs"]);

///IMAGES///

gulp.task('img-min', function() {
    return gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dest/images'))
});

gulp.task('img',['img-min']);

///CSS///

gulp.task('sass', function () {
    return gulp.src('./src/stylesheets/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dest/styles'));
});

gulp.task('concat-css',['sass'], function () { ///['sass'] is dependency syntax
    return gulp.src('./dest/styles/main.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./dest/styles'));
});

gulp.task('minify-css',['concat-css'], function() {
    return gulp.src('dest/styles/bundle.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dest/styles/'));
});

gulp.task('css',['sass','concat-css','minify-css']);



///JAVASCRIPT///

gulp.task('lint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(exitOnJshintError);
});

gulp.task('scripts',['lint'], function() { //concatenate
    return gulp.src('./src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dest/scripts/'));
});


gulp.task('compress',['scripts'], function (cb) { //uglify
    pump([
            gulp.src('./dest/scripts/*.js'),
            uglify(),
            gulp.dest('./dest/scripts/')
        ],
        cb
    );
});

gulp.task('js',['lint','scripts','compress']);


///TESTING///

gulp.task('jasmine', () =>
gulp.src('spec/app/appSpec.js')
// gulp-jasmine works on filepaths so you can't have any plugins before it
    .pipe(jasmine({verbose: true}))
);

gulp.task('test',['jasmine']);

///VERSIONING///

gulp.task('rev', function() { //hash versioning for JS and CSS files
    gulp.src('./dest/html/index.html')
        .pipe(rev())
        .pipe(gulp.dest('./dest/html/'));
});

gulp.task('bump', function(){
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('version',['rev','bump']);


///GIT///

gulp.task('add', function(){
    return gulp.src('./')
        .pipe(git.add());
});

gulp.task('commit', ['add'],function(){
    return gulp.src('./')
        .pipe(git.commit('initial commit'));
});

gulp.task('push', ['commit'],function(){
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});

gulp.task('git',['add','commit','push']);

/**
 * Push build to gh-pages
 */
gulp.task('deployPages', function() {
    return gulp.src('./dest/**/*')
        .pipe(ghPages());
});

///DEPLOY///

gulp.task('deploy',['html','img','css','js',/*'test',*/'version'/*,'git'*/]);


///DEFAULT///

gulp.task('default', function () {
    console.log('Gulp has run!');
});
