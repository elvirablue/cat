var gulp       = require('gulp'), // Подключаем Gulp
    scss         = require('gulp-scss'), //Подключаем scss пакет,
    sass        = require('gulp-sass'),
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)   
    //rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    //uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок   
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск scss
    return gulp.src('app/scss/mix.scss') // Берем источник
        .pipe(sass()) // Преобразуем scss в CSS посредством gulp-scss
        .pipe(autoprefixer(['last 10 versions', '> 1%','ie 10', 'ie 9', 'ie 8'], { cascade: true })) // Создаем префиксы
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('script', function() {
    return gulp.src(['app/js/item/*.js']) // Берем все js        

        .pipe(concat('js-main.js')) // Собираем их в кучу в новом файле 
        //.pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js'))  // Выгружаем в папку app/js
        .pipe(browserSync.reload({stream: true})); // Обновляем JS на странице при изменении
});


gulp.task('watch', ['browser-sync', 'sass', 'script'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за scss файлами в папке scss
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/item/*.js', ['script']);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});



gulp.task('build', ['clean', 'sass', 'script'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css'
    ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);