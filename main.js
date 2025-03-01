const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let cellValue = "";
let randomNumber = Math.random();
let currentPlayer = randomNumber == 0 || randomNumber < 0.5 ? "O" : "X";
console.log(currentPlayer);
let playingStatus = "Not playing";
let cellData = ["", "", "", "", "", "", "", "", ""];
let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function gamestarts() {
  statusText.textContent = `${currentPlayer}'s turn`;
  playingStatus = "playing";
}
gamestarts();
cells.forEach((cell, value) => {
  cell.addEventListener("click", () => {
    cellValue = cell.dataset.cellid;
    if (cellData[value] != "" || playingStatus === "Not playing") {
      return;
    }
    cellData[value] = currentPlayer;
    cell.textContent = currentPlayer;
    decidingWinner();
  });
});
function decidingWinner() {
  let playerWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    let condition = winningConditions[i];
    let cellA = cellData[condition[0]];
    let cellB = cellData[condition[1]];
    let cellC = cellData[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      playerWon = true;
      break;
    }
  }
  if (playerWon) {
    statusText.textContent = `${currentPlayer} WINS!`;
    playingStatus = "Not playing";
  } else if (!cellData.includes("")) {
    statusText.textContent = `Draw`;
    playingStatus = "Not playing";
  } else {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}
restartBtn.addEventListener("click", () => {
  cellData = ["", "", "", "", "", "", "", "", ""];
  let randomNumber = Math.random();
  let currentPlayer = randomNumber == 0 || randomNumber < 0.5 ? "O" : "X";
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  gamestarts();
});
