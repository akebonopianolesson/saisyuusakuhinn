// Smooth Scrool Sample

$(function(){

   $('a[href^="#"]').click(function() {

      // 初期設定：移動時間(ms)と頭出し位置
      var speed = 500;
      var offset = -0;

      // アンカーを取得
      var anchor = $(this).attr("href");

      // ターゲットの位置を取得
      var target = $(anchor == "#" || anchor == "" ? 'html' : anchor);
      var position = target.offset().top + offset;

      // スクロール（アニメーション）
      $('body,html').animate({scrollTop:position}, speed, 'swing');

      return false;

   });


});



// script.js

const threadList = document.getElementById('thread-list');
const newThreadForm = document.getElementById('new-thread-form');

var threads = [];

// ローカルストレージから読み込み.
function loadThreads() {
  const s1 = localStorage.getItem('data');
  if(s1 != '') {
	threads = JSON.parse( s1 );
  }
}
// スレッドデータをHTMLに変換する関数
function threadToHTML(thread) {
  return `
    <div class="thread">
      <div class="thread-name">${thread.name}</div>
      <div class="thread-message">${thread.message}</div>
    </div>
  `;
}
// スレッドを表示する関数
function displayThreads() {
  threadList.innerHTML = '';
  threads.forEach(thread => {
    threadList.innerHTML += threadToHTML(thread);
  });
}
// 新しいスレッドを追加する関数
function addThread(name, message) {
  threads.push({ name, message });
  displayThreads();
  // ローカルストレージに保管.
  const s1 = JSON.stringify(threads);
  localStorage.setItem('data', s1 );
}
// ローカルストレージ全消去.
function clearThread() {
  threads=[];
  // ローカルストレージに保管.
  const s1 = JSON.stringify(threads);
  localStorage.setItem('data', s1 );
}
// 投稿ボタン OnClick
function postMsg() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  if((name!="")&&(message!="")) {
     addThread(name, message);
  }
  newThreadForm.reset();
}
// 全消去ボタン OnClick
function clearMsg() {
  clearThread();
}
// 最初のスレッドを表示する
// addThread('テストユーザー', 'これはテストスレッドです。');
loadThreads();
displayThreads();
//
