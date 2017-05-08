
// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    bower = require('gulp-bower'),
    express = require('express'),
    app = express();

//********prefix scss files with '_' to not support conversion to css files

//clean minified Common css
gulp.task('cleanCommonStyles', function() {
    return gulp.src("www/common/assets/styles/*.css", {
            read: false
        })
        .pipe(rimraf({ force: true }));
});

//common styles task
gulp.task('commonStyles', function() {
    return sass('www/common/assets/styles/*.scss', {
            base: './'
        })
        .on('error', sass.logError)
        .pipe(gulp.dest('./'))
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./'));
});

//clean minified common js
gulp.task('cleanCommonScripts', function() {
    return gulp.src("www/common/js/**/*.min.js", {
            read: false
        })
        .pipe(rimraf({ force: true }));
});

// common javascript minifications
gulp.task('commonScripts', function(){
    return gulp.src(['www/common/js/**/*.js', '!www/common/js/**/*.min.js'], {base:'./'})
    .pipe(uglify())
    .pipe(rename(function (fileName){
        var lastBaseName = fileName.basename.split(".").pop(-1);
        if(lastBaseName !== "min"){
           fileName.basename += '.min';
        }
    }))
    .pipe(gulp.dest('./'));
});

//clean minified modules js
gulp.task('cleanModulesScripts', function() {
    return gulp.src("www/modules/**/*.min.js", {
            read: false
        })
        .pipe(rimraf({ force: true }));
});

//modules javascript minifications
gulp.task('modulesScripts', function(){
	return gulp.src(['www/modules/**/*.js', '!www/modules/**/*.min.js'], {base:'./'})
    .pipe(uglify())
    .pipe(rename(function (fileName){
        var lastBaseName = fileName.basename.split(".").pop(-1);
        if(lastBaseName !== "min"){
           fileName.basename += '.min';
        }
    }))
    .pipe(gulp.dest('./'));
});

//server starting
gulp.task('server', function() {
  //app.use(express.static(__dirname + "/www"));
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
  console.log("server localhost:4000/ started.");
});

//gulp watcher
gulp.task('watch', function() {
    //gulp.watch("www/**/*.js", ['scripts']);
    gulp.watch("www/**/*.scss", ['styles']);
    console.log("Watching ......");

});

//bower install
gulp.task('bower', function() {
  return bower({ cmd: 'update'});
});

//cleaning all minified angular scripts files
gulp.task('clean', ['cleanCommonScripts', 'cleanCommonStyles', 'cleanModulesScripts']);

//minifying angular scripts files
gulp.task('scripts', ['commonScripts', 'modulesScripts']);

//scss to css conversion
gulp.task('styles', ['commonStyles']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'server', 'watch']);

// The clean build task (called when you run `gulp` from cli)
gulp.task('clean-build', ['clean', 'styles', 'server', 'watch']);
