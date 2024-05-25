let sequence = [100, 200, 300];
let fund = 400;
let totalSpent = 400; // 初期の掛け金も含める
let totalWon = 0;
let firstAction = true; // 最初のアクションかどうかを追跡

updateFundDisplay();
updateTotalSpentDisplay();
updateTotalWonDisplay();
displaySequence();
setButtonsEnabled(true);

document.getElementById("confirm-button").addEventListener("click", () => {
  const multiplier = parseInt(document.getElementById("multiplier").value);
  if (multiplier >= 1 && multiplier <= 99) {
    updateGame(multiplier);
  } else {
    alert("倍率は1から99の間で入力してください。");
  }
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

function updateGame(multiplier) {
  const bet =
    sequence.length >= 2
      ? sequence[0] + sequence[sequence.length - 1]
      : sequence[0];

  if (multiplier > 0) {
    sequence = sequence.slice(multiplier, sequence.length - multiplier);
    if (!firstAction) {
      totalSpent += bet; // 最初のアクションでない場合のみ掛け金を加算する
    }
    totalWon += bet * multiplier; // 勝った場合の金額を加算する
  } else {
    sequence.push(bet);
    if (!firstAction) {
      totalSpent += bet; // 最初のアクションでない場合のみ掛け金を加算する
    }
  }

  firstAction = false; // 最初のアクションが発生したのでフラグを下げる

  updateFundDisplay();
  updateTotalSpentDisplay();
  updateTotalWonDisplay();
  displaySequence();

  if (sequence.length <= 1 || isNaN(bet)) {
    endGame();
  }
}

function endGame() {
  const payoutStr = prompt("終了です。最後の配当金を入力してください:");
  if (payoutStr === null || payoutStr.trim() === "" || isNaN(payoutStr)) {
    alert("キャンセルされました。最新の状態に戻ります。");
    displaySequence(); // 最新の数列を表示
    return;
  }
  const payout = parseInt(payoutStr);
  const profit = payout - totalSpent;

  document.getElementById("array").textContent = `終了。利益: ${profit}円`;
  setButtonsEnabled(false);
}

function clearGame() {
  sequence = [100, 200, 300];
  fund = 400;
  totalSpent = 400; // 初期の掛け金も含める
  totalWon = 0;
  firstAction = true; // クリア時にフラグをリセットする
  updateFundDisplay();
  updateTotalSpentDisplay();
  updateTotalWonDisplay();
  displaySequence();
  setButtonsEnabled(true);
}

function saveGame() {
  localStorage.setItem("sequence", JSON.stringify(sequence));
  localStorage.setItem("fund", JSON.stringify(fund));
  localStorage.setItem("totalSpent", JSON.stringify(totalSpent));
  localStorage.setItem("totalWon", JSON.stringify(totalWon));
  localStorage.setItem("firstAction", JSON.stringify(firstAction)); // フラグの状態を保存する
  alert("保存しました");
}

function loadGame() {
  sequence = JSON.parse(localStorage.getItem("sequence")) || [100, 200, 300];
  fund = JSON.parse(localStorage.getItem("fund")) || 400;
  totalSpent = JSON.parse(localStorage.getItem("totalSpent")) || 400; // 初期の掛け金も含める
  totalWon = JSON.parse(localStorage.getItem("totalWon")) || 0;
  firstAction = JSON.parse(localStorage.getItem("firstAction")) || true; // フラグの状態を読み込む
  updateFundDisplay();
  updateTotalSpentDisplay();
  updateTotalWonDisplay();
  displaySequence();
  setButtonsEnabled(true);
}

function displaySequence() {
  const array = document.getElementById("array");
  array.textContent = sequence;
}

function updateFundDisplay() {
  fund =
    sequence.length >= 2
      ? sequence[0] + sequence[sequence.length - 1]
      : sequence[0];
  document.getElementById("fund").textContent = fund || "終了";
}

function updateTotalSpentDisplay() {
  document.getElementById("total-spent").textContent = totalSpent;
}

function updateTotalWonDisplay() {
  let totalWonElement = document.getElementById("total-won");
  if (!totalWonElement) {
    totalWonElement = document.createElement("p");
    totalWonElement.id = "total-won";
    totalWonElement.textContent = `今までの獲得金額：${totalWon}`;
    document.body.appendChild(totalWonElement);
  } else {
    totalWonElement.textContent = `今までの獲得金額：${totalWon}`;
  }
}

function saveGameToFile() {
  const data = JSON.stringify({
    sequence,
    fund,
    totalSpent,
    totalWon,
    firstAction,
  });
  const blob = new Blob([data], { type: "text/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "game_data.json";
  link.click();
  alert("保存しました");
}

function loadGameFromFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", function () {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", function () {
      const data = JSON.parse(reader.result);
      sequence = data.sequence || [100, 200, 300];
      fund = data.fund || 400;
      totalSpent = data.totalSpent || 400; // 初期の掛け金も含める
      totalWon = data.totalWon || 0;
      firstAction = data.firstAction !== undefined ? data.firstAction : true; // フラグの状態を読み込む
      updateFundDisplay();
      updateTotalSpentDisplay();
      updateTotalWonDisplay();
      displaySequence();
      setButtonsEnabled(true);
    });
  });
  input.click();
}

function setButtonsEnabled(enabled) {
  document.getElementById("confirm-button").disabled = !enabled;
  document.getElementById("lose-button").disabled = !enabled;
}
