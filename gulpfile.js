'use strict'

//Require a pile of crap.  But it's sooo worth it.
var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var flatten = require('gulp-flatten');
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
    gulp.src('bower_components/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('public/app/assets/js/vendor/'));
});

//Add bower dependencies in here.  Order matters.
gulp.task('vendor', function() {
    gulp.src([
            'public/app/assets/js/vendor/jquery.min.js',
            'public/app/assets/js/vendor/angular.min.js',
            'public/app/assets/js/vendor/angular-resource.min.js',
            'public/app/assets/js/vendor/angular-ui-router.min.js',
            'public/app/assets/js/vendor/ui-bootstrap.min.js',
            'public/app/assets/js/vendor/ui-bootstrap-tpls.min.js',
            'public/app/assets/js/vendor/typeahead.bundle.min.js',
            'public/app/assets/js/vendor/typeahead.jquery.min.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('public/app/dist/'));
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
        .pipe(concat('brew-lab.js'))
        .pipe(gulp.dest('public/app/dist/'))
        .pipe(rename('brew-lab.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/app/dist/'));
});

gulp.task('watch', function() {
    gulp.watch('public/app/assets/less/*.less', ['less']);
    gulp.watch('public/app/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['bower', 'vendor', 'less', 'scripts', 'watch']);