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


var gulp = require('gulp'),
    tinypng_nokey = require('gulp-tinypng-nokey');


var imgcompress = function(url){
    gulp.task('testImagemin', function () {
        gulp.src('../public/blog/html/'+url+'*.{png,jpg,jpeg}',{ base: '../public/blog' })
            .pipe(tinypng_nokey())
            .pipe(gulp.dest('../public/blog/dst'));
    });
}

var dirchange = function(url){
    var watcher = gulp.watch('../public/blog/html/'+url, ['testImagemin']);
    watcher.on('changed', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}

module.exports = imgcompress;
