const { src, dest, watch, series, parallel } = require("gulp");

const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const sassGlob = require('gulp-sass-glob'); 
const browserSync = require('browser-sync');
const gcmq = require('gulp-group-css-media-queries');
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false,
})
const webpack = require("webpack");
// gulpでwebpackを使う用のプラグイン
const webpackStream = require("webpack-stream");

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

const compileSass = done => {
  const postcssPlugins = [
    autoprefixer({
    // browserlistはpackage.jsonに記載[推奨]
    cascade: false,
    // grid: 'autoplace' // IE11のgrid対応('-ms-')
    }),
    cssdeclsort({ order: 'alphabetical' /* smacss, concentric-css */ })
  ]

  src("./src/scss/**/*.scss", { sourcemaps: true  /* init */})
  .pipe(plumber())
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(postcssPlugins))
  .pipe(mode.production(gcmq()))
  .pipe(dest("./dist/css", { sourcemaps: './sourcemaps' /* write */ }));
  done(); // 終了宣言
}

// ローカルサーバ起動
const buildServer = done => {
  browserSync.init({
    port: 8080,
    notify: false,
　　// 静的サイト
    server: {
      baseDir: './',
    },
    // 動的サイト
    // files: ['./**/*.php'],
    // proxy: 'http://localsite.wp/',
  })
  done()
}

// ブラウザ自動リロード
const browserReload = done => {
  browserSync.reload()
  done()
}

// webpack
const bundleJs = () => {
  // webpackStreamの第2引数にwebpackを渡す
  return webpackStream(webpackConfig, webpack)
    .pipe(dest("./dist/js"));
};

// ファイル監視
const watchFiles = () => {
  watch('./**/*.html', browserReload)
  watch('.src/scss/**/*.scss', series(compileSass, browserReload))
  watch('.src/js/**/*.js', series(bundleJs, browserReload))
}

exports.sass = compileSass;
exports.default = parallel(buildServer, watchFiles);