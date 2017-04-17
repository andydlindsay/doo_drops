// include gulp
const gulp = require('gulp');

// include plugins
const eslint = require('gulp-eslint'),
    //   sass = require('gulp-sass'),
      mocha = require('gulp-mocha');

// lint task
gulp.task('lint', () => {
    return gulp.src(['*.js', 'models/*.js', 'routes/*.js'])
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError());
});

// compile sass
// gulp.task('sass', () => {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('client/css'));
// });

// mocha testing
gulp.task('test', () => {
    return gulp.src(['test/*.js'])
        .pipe(mocha({
            timeout: 10000
        }))
        .on('error', () => {});
});

// watch for file changes
gulp.task('watch', () => {
    gulp.watch('*.js', ['lint']);
    // gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('*.js', ['test']);
});

// default task
gulp.task('default', [
    'lint',
    // 'sass',
    'test',
    'watch'
]);