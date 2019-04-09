const 	gulp 	= require("gulp"),
		babel 	= require("gulp-babel"),
		sass 	= require("gulp-sass");

gulp.task("css", done => {
	gulp.src("./app/scss/mainstyle.scss")
	.pipe(sass().on("error", e => console.log(e.toString())))
	.pipe(gulp.dest("./dist/css/"));
	done();
});

gulp.task("js", done => {
	gulp.src("./app/js/*.js")
	.pipe(babel().on("error", e => console.log(e.toString())))
	.pipe(gulp.dest("./dist/js/"));
	done();
});

gulp.task("watch", done => {
	gulp.watch("./app/scss/**/*.scss", gulp.parallel("css"));
	gulp.watch("./app/js/**/*.js", gulp.parallel("js"));
	done();
});

gulp.task("default", gulp.parallel("watch"));