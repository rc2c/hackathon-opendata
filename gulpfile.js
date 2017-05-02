var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ['> 5%', 'IE 9']});

gulp.task('less', function () {
    return gulp.src('./sites/default/themes/child/styles/theme.less')
        .pipe(less({
            plugins: [autoprefix]
        }).on('error', function(error){
		     console.log(error);
		     this.emit('end');
		}))
    .pipe(rename('theme.css'))
    .pipe(gulp.dest('./sites/default/themes/child/styles/dist'));
});

gulp.task('watch', function() {
    gulp.watch('./sites/default/themes/child/styles/**/*.less', ['less']);
});

gulp.task('default', ['watch']);