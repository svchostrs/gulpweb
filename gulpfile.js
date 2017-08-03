 var gulp = require('gulp'),
     gulpclean = require('gulp-clean'),
     gulpconcat = require('gulp-concat'),
     gulpimagemin = require('gulp-imagemin'),
     gulpminifycss = require('gulp-minify-css'),
     fileinclude = require('gulp-file-include'),
     autoprefixer = require('gulp-autoprefixer'),
     sass = require('gulp-sass'),
     browserSync = require('browser-Sync'),
     git = require('gulp-git');
 var requireDir = require('require-dir');
 requireDir('./tools');

 const reload = browserSync.reload;


gulp.task('html',()=> {
 	return gulp.src('app/src/*.html')
 	  .pipe(fileinclude({
      prefix: '@@',
      basepath: 'app/tpl/'
    }))
 	.pipe(gulp.dest('dist/'))
 });

gulp.task('clean',()=>{
	return gulp.src('dist/')
	 .pipe(gulpclean());
});

gulp.task('styles',()=>{
	return gulp.src('app/styles/*.scss')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(gulpminifycss())
	 .pipe(autoprefixer())
	.pipe(gulp.dest('dist/styles'))
});

gulp.task('scripts',()=>{
	return gulp.src('app/scripts/**/*')
	  .pipe(gulp.dest('dist/scripts'))
})

gulp.task('images',()=>{
	return gulp.src('app/images/**/*')
	 .pipe(gulp.dest('dist/images'));
})

gulp.task('serve',['html','styles','scripts'],()=>{
	browserSync({
		notify: false,
		port:8000,
		server: {
			baseDir:'dist/'
		}
	});

	gulp.watch('app/tpl/*.html',['html']).on('change',reload);
});

 
gulp.task('default',['clean'],()=>{
      gulp.start('serve');
});


//  上传文件
gulp.task('forgit',['add','commit','push'],()=>{

});