var gulp = require('gulp'),
    tinypng_nokey = require('gulp-tinypng-nokey');
var minimist = require('minimist');

var knownOptions = {
    string: 'url',
//  default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

console.log(options.url)

gulp.task('testImagemin', function () {
    gulp.src('../public/blog/html/'+options.url+'/*.{png,jpg,jpeg}',{ base: '../public/blog' })
        .pipe(tinypng_nokey())
        .pipe(gulp.dest('../public/blog/'));
});


