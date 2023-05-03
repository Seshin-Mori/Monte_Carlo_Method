// 初期値設定
let sequence = [100, 200, 300];
let fund = 400;
updateFundDisplay(); // Updated
displaySequence();

// イベントリスナー追加
["twice", "three", "four", "five"].forEach((value, index) => {
  document
    .getElementById(`${value}-win-button`)
    .addEventListener("click", () => updateGame(index + 1));
});
document
  .getElementById("lose-button")
  .addEventListener("click", () => updateGame(-1));
document.getElementById("clear-button").addEventListener("click", clearGame);
document.getElementById("save-button").addEventListener("click", saveGame);
document.getElementById("load-button").addEventListener("click", loadGame);
document.getElementById("save-json").addEventListener("click", saveGameToFile);
document
  .getElementById("load-json")
  .addEventListener("click", loadGameFromFile);

// ゲームの状態を更新
function updateGame(removalCount) {
  const bet =
    sequence.length >= 2
      ? sequence[0] + sequence[sequence.length - 1]
      : sequence[0];

  if (removalCount > 0) {
    sequence = sequence.slice(removalCount, sequence.length - removalCount);
  } else {
    sequence.push(bet);
  }

  updateFundDisplay(); // Updated
  displaySequence();

  if (sequence.length <= 1 || isNaN(bet)) {
    document.getElementById("array").textContent = "終了";
  }
}

// ゲームの状態をクリア
function clearGame() {
  sequence = [100, 200, 300];
  updateFundDisplay(); // Updated
  displaySequence();
}

// ゲームの状態を保存
function saveGame() {
  localStorage.setItem("sequence", JSON.stringify(sequence));
  localStorage.setItem("fund", JSON.stringify(fund));
  alert("保存しました");
}

// ゲームの状態を読み込み
function loadGame() {
  sequence = JSON.parse(localStorage.getItem("sequence"));
  fund = JSON.parse(localStorage.getItem("fund"));
  updateFundDisplay(); // Updated
  displaySequence();
}

// 現在のsequenceを表示
function displaySequence() {
  const array = document.getElementById("array");
  array.textContent = sequence;
}

// Updated: fundの表示を更新する関数を追加
function updateFundDisplay() {
  fund =
    sequence.length >= 2
      ? sequence[0] + sequence[sequence.length - 1]
      : sequence[0];
  document.getElementById("fund").textContent = fund || "終了";
}

// ゲームの状態をファイルに保存
function saveGameToFile() {
  const blob = new Blob([JSON.stringify(sequence)], { type: "text/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sequence.json";
  link.click();
  alert("保存しました");
}

// ゲームの状態をファイルから読み込み
function loadGameFromFile() {
  const input = document.createElement("nput");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", function () {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function () {
      sequence = JSON.parse(reader.result);
      updateFundDisplay(); // Updated
      displaySequence();
    });
  });
  input.click();
}
