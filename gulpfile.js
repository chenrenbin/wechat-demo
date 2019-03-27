const gulp = require('gulp');
const path = require('path');
const changed = require('gulp-changed');
const tap = require('gulp-tap');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const config = require('./build/config');

const hasRmCssFiles = new Set();


gulp.task('default', gulp.series(copy, sassTranslate, cleanWxss, function () {
  return new Promise(function(resolve, reject) {
    console.log("default");
    resolve();
  })}
));

gulp.task('watch', function() {
  gulp.watch('./src/**/*', gulp.series('default'))
})

gulp.task('clear', function() {
  return gulp.src('./dist/*')
    .pipe(clean({ force: true }));
})

function copy () {
  return gulp.src(['./src/**/*', '!./src/**/*.scss'])
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
}

function sassTranslate () {
  return gulp.src('./src/**/*.scss')
    .pipe(changed('./dist'))
    .pipe(tap((file) => {
      setRmCssFiles(file)
    }))
    .pipe(replace(/(@import.+;)/g, ($1, $2) => {
      const hasFilter = config.cssFilterFiles.filter(item => $1.indexOf(item) > -1)
      return hasFilter.length > 0 ? $2 : `/** ${$2} **/`
    }))
    .pipe(sass().on('error', sass.logError)) // scss编译成css
    .pipe(replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) => $3.replace(/\.scss/g, '.wxss')))
    .pipe(rename({extname: '.wxss'}))
    .pipe(gulp.dest('./dist'))
}

function setRmCssFiles (file) {
  const filePath = path.dirname(file.path)
  const content = file.contents.toString()
  console.log(0, path.basename(file.path))
  content.replace(/@import\s+['|"](.+)['|"];/g, ($1, $2) => {
    const hasFilter = config.cssFilterFiles.filter(item => $2.indexOf(item) > -1)
    // hasFilter > 0表示filter的文件在配置文件中，打包完成后需要删除
    console.log(1, hasFilter, hasRmCssFiles)
    if (hasFilter.length > 0) {
      const rmPath = path.join(filePath, $2);
      // 将src改为dist，.scss改为.wxss，例如：'/xxx/src/wxss/const.wxss' => '/xxx/dist/wxss/const.wxss'
      const filea = rmPath.replace(/src/, 'dist').replace(/\.scss/, '.wxss');
      // 加入待删除列表
      hasRmCssFiles.add(filea);
    }
    console.log(2, hasFilter, hasRmCssFiles)
  })
}

function cleanWxss () {
  const arr = [];
  hasRmCssFiles.forEach((item) => {
    arr.push(item)
  })
  console.log('clean:', arr)
  return gulp.src(arr, { read: false }).pipe(clean({ force: true }));
}