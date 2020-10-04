# 環境構築
1. Node.js インストール　※LTSの最新をインストール
https://nodejs.org/ja/

2. gulp インストール
```
npm install --save-dev gulp
```

3. gulp-sassインストール
```
npm install --save-dev gulp-sass
```

4. gulp-plumberインストール
sassの記述を間違えてコンパイルエラーした際にgulpを停止させない。
```
npm install gulp-plumber --save-dev
```

5. gulp-postcssインストール
CSSを解析・変換するツール。プラグインを合わせて使うのが一般的
```
npm install gulp-postcss --save-dev
```

6. autoprefixerパッケージインストール
ベンダープレフィックスの自動付与
```
npm install autoprefixer --save-dev
```

7. css-declaration-sorterインストール

```
npm install css-declaration-sorter --save-dev
```

8. gulp-sass-globインストール
ベンダープレフィックスの自動付与
```
npm install gulp-sass-glob --save-dev
```

9. gulp-group-css-media-queriesインストール
ベンダープレフィックスの自動付与
```
npm install gulp-group-css-media-queries --save-dev
```

10. browser-syncインストール
ブラウザ自動リロード
```
npm install browser-sync --save-dev
```

11. babelインストール
javaScriptトランスパイル
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

12. webpackインストール
一つのJSファイルにまとめて、高速化と可読性を上げる
```
npm i -D webpack webpack-cli
```
iはinstall
-Dは--save-dev


13. gulpfile.js の作成
```
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

```
https://steelydylan.github.io/gulp-generator/


