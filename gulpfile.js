/*******************************************************************************
 *@file gulpfile.js contains details of all gulp tasks required for summitstore-api
 *
 *@author : sapient
 ******************************************************************************/
'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var fs=require('fs');

// js linting
gulp.task('jsLint', function () {
    return gulp.src(['**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));

});
gulp.task('default', ['jsLint']);
