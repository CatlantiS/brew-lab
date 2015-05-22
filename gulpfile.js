'use strict'

//Require a pile of crap.  But it's sooo worth it.
var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var bower = require('gulp-bower');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');

//gulp.task('lint', function() {
//    return gulp.src('public/app/scripts/**/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

gulp.task('bower', function() {
   return bower()
       .pipe(gulp.dest('lib/'));
});

gulp.task('less', function() {
    return gulp.src('public/app/assets/less/*.less')
        .pipe(less({
            paths: ['public/app/assets/less/']
        }))
        .pipe(gulp.dest('public/app/assets/css/'));
});

gulp.task('scripts', function() {
    return gulp.src('public/app/scripts/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/app/scripts/dist/'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/app/dist/'));
});

gulp.task('watch', function() {
    gulp.watch('public/app/assets/less/*.less', ['less']);
    gulp.watch('public/app/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['bower', 'less', 'scripts', 'watch']);