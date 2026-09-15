/* config.js — 公開後にURLを入れる、ただ1つの場所
   どちらも空のままなら、ボタンは「まもなく」の表示になる。
   1) storeUrl    … Chrome ウェブストアの掲載ページ（審査を通ったあと）
   2) checkoutUrl … Lemon Squeezy の Checkout link（商品を公開したあと）

   拡張機能側は触らなくてよい。購入ボタンはこのサイトの料金欄を指しているため、
   決済事業者を変えてもここを差し替えるだけで済む。 */

window.SITE = {
  storeUrl: 'https://chromewebstore.google.com/detail/table-to-csv-exporter/ghkkacbmfgoknfikfhbccjnjbpmlgaed',
  checkoutUrl: 'https://pdf-downloader.lemonsqueezy.com/checkout/buy/e0549c19-2174-490e-bee9-5e4bc7110208'
};

// data-link="store" / "checkout" の要素を、URLが入っていれば本物のリンクに変える。
// i18n.js より先に読み込むこと（表示文字はそのあとで入る）。
//
// 購入ボタンは storeUrl が入るまで出さない。拡張機能を入れられないのに買えてしまうと、
// 買った人が有効化するものを持てない。ストアの掲載が公開された時点で、
// 「入手」と「購入」が同時に生きる。
(() => {
  const sellable = !!window.SITE.storeUrl;
  const wire = (name, url, readyKey) => {
    for (const el of document.querySelectorAll('[data-link="' + name + '"]')) {
      if (!url) continue;
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.classList.remove('btn-soon');
      el.classList.add(el.dataset.readyClass || 'btn-primary');
      el.dataset.i18n = readyKey;
    }
  };
  wire('store', window.SITE.storeUrl, 'actInstall');
  wire('checkout', sellable ? window.SITE.checkoutUrl : '', 'buyNow');
})();
