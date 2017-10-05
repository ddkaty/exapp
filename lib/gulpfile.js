// var gulp = require('gulp'),
//     imagemin = require('gulp-imagemin'),
//     pngquant = require('imagemin-pngquant');

// gulp.task('testImagemin', function () {
// gulp.src('../src/image/*.{png,jpg,gif,ico}')
//     .pipe(imagemin({
//         optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
//         progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
//         use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//     }))
//     .pipe(gulp.dest('../dist/img'));
// });


var gulp = require('gulp');
var tinypng_nokey = require('gulp-tinypng-nokey');

gulp.task('testImagemin', function () {
    gulp.src('../public/blog/html/**/*.{png,jpg,jpeg}')
        .pipe(tinypng_nokey())
        .pipe(gulp.dest('../public/blog/html/**/dst/'));
});
