// 数列の初期値を設定する
let sequence = [100, 200, 300];
// 資金の初期値を設定する
let fund = 400;
document.getElementById("fund").textContent = fund;
displaySequence();

// 2倍勝ったボタンをクリックしたときの処理
document
  .getElementById("twice-win-button")
  .addEventListener("click", function () {
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
      array.textContent = "終了";
    }
    //掛け金情報がNaNになったら、終了と表示する
    if (isNaN(bet)) {
      document.getElementById("array").textContent = "終了";
      array.textContent = "終了";
      document.getElementById("fund").textContent = "終了";
    }
  });

//3倍勝ったボタンをクリックしたときの処理
document
  .getElementById("three-win-button")
  .addEventListener("click", function () {
    //数列の左端二つの数字と右端二つの数字を削除する
    sequence.shift();
    sequence.shift();
    sequence.pop();
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
      array.textContent = "終了";
    }
    //掛け金情報がNaNになったら、終了と表示する
    if (isNaN(bet)) {
      document.getElementById("array").textContent = "終了";
      array.textContent = "終了";
      document.getElementById("fund").textContent = "終了";
    }
  });

//4倍勝ったボタンをクリックしたときの処理
document
  .getElementById("four-win-button")
  .addEventListener("click", function () {
    //数列の左端三つの数字と右端三つの数字を削除する
    for (let i = 0; i < 3; i++) {
      sequence.shift();
      sequence.pop();
    }
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
      array.textContent = "終了";
    }
    //掛け金情報がNaNになったら、終了と表示する
    if (isNaN(bet)) {
      document.getElementById("array").textContent = "終了";
      array.textContent = "終了";
      document.getElementById("fund").textContent = "終了";
    }
  });

//5倍勝ったボタンをクリックしたときの処理
document
  .getElementById("five-win-button")
  .addEventListener("click", function () {
    //数列の左端四つの数字と右端四つの数字を削除する
    for (let i = 0; i < 4; i++) {
      sequence.shift();
      sequence.pop();
    }
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
      array.textContent = "終了";
    }
    //掛け金情報がNaNになったら、終了と表示する
    if (isNaN(bet)) {
      document.getElementById("array").textContent = "終了";
      array.textContent = "終了";
      document.getElementById("fund").textContent = "終了";
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

  //betがNaNになったら、終了と表示する
  if (isNaN(bet)) {
    document.getElementById("array").textContent = "終了";
    array.textContent = "終了";
    document.getElementById("fund").textContent = "終了";
  }
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

//保存ボタンをクリックしたときの処理
document.getElementById("save-button").addEventListener("click", function () {
  //現在のsequenceの中身をlocalStorageに保存する
  localStorage.setItem("sequence", JSON.stringify(sequence));
  //現在のfundの中身をlocalStorageに保存する
  localStorage.setItem("fund", JSON.stringify(fund));
  //保存しましたと表示する
  alert("保存しました");
});

//ロードボタンをクリックしたときの処理
document.getElementById("load-button").addEventListener("click", function () {
  //localStorageからsequenceの中身を取得する
  sequence = JSON.parse(localStorage.getItem("sequence"));
  //localStorageからfundの中身を取得する
  fund = JSON.parse(localStorage.getItem("fund"));
  //資金を表示する
  document.getElementById("fund").textContent = fund;
  //array要素に表示する
  displaySequence();
});
//現在のsequenceの中身をarray要素に表示する
function displaySequence() {
  const array = document.getElementById("array");
  array.textContent = sequence;
}
