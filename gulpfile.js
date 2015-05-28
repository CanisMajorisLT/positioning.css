/**
 * Created by vyt on 2015-03-05.
 */

var gulp = require('gulp');
var using = require('gulp-using');
var browswerSync = require('browser-sync');
var reload = browswerSync.reload;

gulp.task('browser-sync', function () {
    browswerSync({
        proxy: "localhost:3000",
        ui: {port: 3002}
    });
    gulp.watch('./public/javascripts/*.js', reload);
    gulp.watch('./views/*.hjs').on('change', reload)

});



