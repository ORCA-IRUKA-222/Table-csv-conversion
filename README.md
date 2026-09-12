# 製品サイト

Lemon Squeezy の Website URL と、Chrome ウェブストアのプライバシーポリシーURLに使うページです。
購入直後のライセンス自動有効化も、このサイトの `activate.html` が担当します。

このフォルダは**そのまま GitHub Pages に置ける静的サイト**です。ビルドは要りません。

```
index.html        紹介と料金（購入ボタンは #pricing）
activate.html     購入直後に開くページ。URLの ?key= を拡張機能が拾って自動で有効化する
privacy.html      プライバシーポリシー（英語・ストア審査で必須）
privacy.ja.html   同（日本語）
config.js         公開後にURLを2つ入れるだけのファイル
i18n.js           8言語の対訳（tools/make-site-i18n.py が生成）
favicon.png
demo/             試用ページ。3ページに分かれた表・ARIAグリッド・レイアウト表を置いてある
                  （tools/make-demo.py が生成）
```

## 公開のしかた

公開先は **https://github.com/ORCA-IRUKA-222/Table-csv-conversion**（Public）です。
拡張機能のソースは別の非公開リポジトリ `Table-csv-conversion-src` にあります。
ライセンス判定を含むソースを公開しないための分け方で、PDF版と同じ構成です。

このフォルダの中身が、そのリポジトリの `main` ブランチ直下に入ります。

```
git -C site init -b main
git -C site remote add origin https://github.com/ORCA-IRUKA-222/Table-csv-conversion.git
git -C site add -A && git -C site commit -m "製品サイト"
git -C site push -u origin main
```

そのあと、リポジトリの **Settings → Pages → Source** を `main` / `/ (root)` にします。
数分待つと、次の3つが開くようになります。

```
https://orca-iruka-222.github.io/Table-csv-conversion/
https://orca-iruka-222.github.io/Table-csv-conversion/privacy.html
https://orca-iruka-222.github.io/Table-csv-conversion/activate.html?key=TEST
```

上の2つが、Lemon Squeezy の Website URL と Chrome ウェブストアのプライバシーポリシーURLになります。

## 別のリポジトリ名にする場合

URLは拡張機能とサイトの両方に埋まっています。1か所でも残ると、購入したのに自動で
有効化されない、という形で表に出ます。手で直さず、次のコマンドで揃えてください。

```
python3 tools/set-site-url.py https://orca-iruka-222.github.io/新しい名前/
python3 tools/build.py            # 提出用ZIPを作り直す
python3 tools/set-site-url.py --check
```

## 公開後にすること

`config.js` の2行を埋めて push するだけです。拡張機能の再提出は要りません。

```js
window.SITE = {
  storeUrl: '',      // Chrome ウェブストアの掲載ページ（審査を通ったあと）
  checkoutUrl: ''    // Lemon Squeezy の Checkout link（商品を公開したあと）
};
```

どちらも空のあいだ、ボタンは「まもなく公開」「まもなく販売開始」の表示のままです。
URLを入れると、そのままインストールボタンと購入ボタンに変わります。

**購入ボタンをサイト側に置いているのは意図的です。** 拡張機能の購入導線はこのサイトの
料金欄を指しているので、決済事業者を変えても拡張機能の再審査が要りません。

## 手元で確かめる

```
python3 -m http.server 8000 --directory site
```

`http://localhost:8000/` を開きます。言語は右上のセレクタか `?lang=ja` で切り替わります。

サイトと拡張機能の突き合わせは、リポジトリ直下から次で行えます（実際の Chromium を使います）。

```
node tools/test-site.mjs
```
