const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const browserify = require('browserify');
const log = require('gulplog');
const source = require('vinyl-source-stream');
const wrap = require('gulp-exports');

gulp.task('fonts', function (done) {
    gulp.src('./src/fonts/*.**')
        .pipe(gulp.dest('./dist/fonts'));

    // gulp.src('./webuploader/*.css')
    //     .pipe(gulp.dest('./dist/webuploader'));

    done();
});

gulp.task('css', function (done) {
    gulp.src('./src/css/**')
        .pipe(gulp.dest('./dist/css'));

    // gulp.src('./webuploader/*.css')
    //     .pipe(gulp.dest('./dist/webuploader'));

    done();
});

gulp.task('script', function(done){
    browserify({
        entries: ['./src/js/index.js'],
        transform: ['babelify'],
        dubug: true,
        standalone: 'AE' // 外部可以使用的变量
    })
        .bundle()
        .on('error', log.error.bind(log, 'Browserify Error'))
        .pipe(source('all.js'))
        //   .pipe(babel())
        .pipe(gulp.dest('./dist/js'));

    done();

	// return gulp.src('./src/js/*.js')
	// 	.pipe(babel())
     //    .pipe(concat('all.js'))
	// 	.pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function(done){
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));

    done();
	// return gulp.src('./src/*.html')
     //    .pipe(gulp.dest('./dist/'));
});

// 静态服务器
gulp.task('server', function(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/js/*.js', gulp.series('script'));
    gulp.watch('./src/css/*.css', gulp.series('css'));
    gulp.watch('./src/*.html',  gulp.series('html'));
    gulp.watch('./dist/**/*.*').on('change', browserSync.reload);

    done();
});

gulp.task('default', gulp.series('script', 'css', 'fonts', 'html', 'server', function(){

}))

