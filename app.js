// 数列の初期値を設定する
let sequence = [100, 200, 300];
// 資金の初期値を設定する
let fund = 400;
document.getElementById("fund").textContent = fund;
displaySequence();

// 勝ったボタンをクリックしたときの処理
document.getElementById("win-button").addEventListener("click", function () {
  //数列の左端の数字と右端の数字を削除する
  sequence.shift();
  sequence.pop();
  //削除後の数列の左端と右端の数字を賭け金とする
  const bet = sequence[0] + sequence[sequence.length - 1];
  //資金を更新する
  fund = bet;
  // 資金を表示する
  document.getElementById("fund").textContent = fund;
  displaySequence();
  //要素が一件以下になったら、終了と表示する
  if (sequence.length <= 1) {
    document.getElementById("array").textContent = "終了";
    document.getElementById("array").style.color = "red";
    array.textContent = "終了";
  }
  //掛け金情報がNaNになったら、終了と表示する
  if (isNaN(bet)) {
    document.getElementById("array").textContent = "終了";
    document.getElementById("array").style.color = "red";
    array.textContent = "終了";
  }
});

// 負けたボタンをクリックしたときの処理
document.getElementById("lose-button").addEventListener("click", function () {
  //数列に左端と右端の数字を足したものを追加する
  sequence.push(sequence[0] + sequence[sequence.length - 1]);
  //追加後の数列の左端と右端の数字を賭け金とする
  const bet = sequence[0] + sequence[sequence.length - 1];
  //資金を更新する
  fund = bet;
  // 資金を表示する
  document.getElementById("fund").textContent = fund;
  displaySequence();
});

// クリアボタンをクリックしたときの処理
document.getElementById("clear-button").addEventListener("click", function () {
  // 数列と資金を初期化する
  sequence = [100, 200, 300];
  fund = 400;
  // 資金を表示する
  document.getElementById("fund").textContent = fund;
  //array要素に表示する
  displaySequence();
});

//現在のsequenceの中身をarray要素に表示する
function displaySequence() {
  const array = document.getElementById("array");
  array.textContent = sequence;
}
