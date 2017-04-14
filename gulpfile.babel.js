import critical from 'critical'
import babelify from 'babelify'
import browserSync from 'browser-sync'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import gulp from 'gulp'
import plugins from 'gulp-load-plugins'
import source from 'vinyl-source-stream'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'

// Server
gulp.task('server', () => {
    browserSync({
      'browser': ['google-chrome'],
        'server': './',
        'port': 8000,
        'snippetOptions': {
            'rule': {
                'match': /<\/body>/i,
                'fn': (snippet) => snippet
            }
        }
    });

    gulp.watch('./src/scss/**/*.scss', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./*.html', browserSync.reload);
});

// Scripts
gulp.task('scripts', () => {
    return browserify({
        'entries': ['./src/js/main.js'],
        'debug': true,
        'transform': [
            babelify.configure({
                'presets': ['es2015']
            })
        ]
    })
    .bundle()
    .on('error', function () {
        var args = Array.prototype.slice.call(arguments);

        plugins().notify.onError({
            'title': 'Compile Error',
            'message': '<%= error.message %>'
        }).apply(this, args);

        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(buffer())
    .pipe(plugins().sourcemaps.init({'loadMaps': true}))
    .pipe(uglify())
    .pipe(plugins().sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});


// Styles
gulp.task('styles', () => {
  const cssPlugins = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plugins().sourcemaps.init())
        .pipe(plugins().sass().on('error', plugins().sass.logError))
        .pipe(plugins().sourcemaps.write())
        .pipe(postcss(cssPlugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

// Tasks
gulp.task('default', ['server', 'scripts', 'styles']);
