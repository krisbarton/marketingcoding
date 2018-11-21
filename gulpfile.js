const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const image = require('gulp-image');
const htmlClean = require('gulp-htmlmin');
const inject = require('gulp-inject');

gulp.task('sass', function () {
    return gulp.src('./src/sass/build/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'))
});

gulp.task('minify-css', ['sass'], function () {
    return gulp.src('./build/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('image', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(image())
        .pipe(gulp.dest('./src/assets'))
        .pipe(gulp.dest('./build/assets'));
});


gulp.task('cleanHTML', function () {
    return gulp.src('src/compiled/**/*.html')
        .pipe(htmlClean({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('build', function () {
    gulp.src('./src/html/**/*.html')
        .pipe(inject(gulp.src(['./src/template-parts/navigation/navigation.html']), {
            starttag: '<!--inject:navigation:{{ext}}-->',
            endtag: '<!--endinject:navigation-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/template-parts/header/header.html']), {
            starttag: '<!--inject:header:{{ext}}-->',
            endtag: '<!--endinject:header-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/template-parts/social/facebookShareCode.html']), {
            starttag: '<!--inject:fbShareCode:{{ext}}-->',
            endtag: '<!--endinject:fbShareCode-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/template-parts/social/facebookShareButton.html']), {
            starttag: '<!--inject:fbShareButton:{{ext}}-->',
            endtag: '<!--endinject:fbShareButton-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./build/css/homePage.css']), {
            starttag: '<!--inject:homepage:{{ext}}-->',
            endtag: '<!--endinject:homepage-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(inject(gulp.src(['./build/css/allArticlesPage.css']), {
            starttag: '<!--inject:allArticles:{{ext}}-->',
            endtag: '<!--endinject:allArticles-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(inject(gulp.src(['./build/css/articlePage.css']), {
            starttag: '<!--inject:article:{{ext}}-->',
            endtag: '<!--endinject:article-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(inject(gulp.src(['./build/css/generalPage.css']), {
            starttag: '<!--inject:generalPage:{{ext}}-->',
            endtag: '<!--endinject:generalPage-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(inject(gulp.src(['./build/css/landing.css']), {
            starttag: '<!--inject:landing:{{ext}}-->',
            endtag: '<!--endinject:landing-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(gulp.dest('./src/compiled'));
});

gulp.task('build:articlesPage', function () {
    gulp.src('./src/html/articles.html')
        .pipe(inject(gulp.src(['./src/template-parts/navigation/navigation.html']), {
            starttag: '<!--inject:navigation:{{ext}}-->',
            endtag: '<!--endinject:navigation-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./src/template-parts/header/header.html']), {
            starttag: '<!--inject:header:{{ext}}-->',
            endtag: '<!--endinject:header-->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src(['./build/css/allArticlesPage.css']), {
            starttag: '<!--inject:allArticles:{{ext}}-->',
            endtag: '<!--endinject:allArticles-->',
            transform: function (filePath, file) {
                return '<style>' + file.contents.toString('utf8') + '</style>'
            }
        }))
        .pipe(gulp.dest('./src/compiled'));
});

gulp.task('default', ['sass', 'minify-css', 'cleanHTML']);
gulp.task('cssChange', ['minify-css', 'build', 'cleanHTML']);