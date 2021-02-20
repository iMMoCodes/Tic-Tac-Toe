const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const blockElements = document.querySelectorAll("[data-block]");
const container = document.querySelector(".container");
const endBanner = document.querySelector(".end-banner");
const restartButton = document.getElementById("restartButton");
const endBannerText = document.querySelector("[data-end-banner-text]");
let oTurn;

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
  oTurn = false;
  blockElements.forEach(block => {
    block.classList.remove(X_CLASS)
    block.classList.remove(O_CLASS)
    block.removeEventListener("click", handleClick)
    block.addEventListener("click", handleClick, { once: true })
  })
  setBoardHoverClass()
  endBanner.classList.remove("show")
}

function handleClick (e) {
  const block = e.target
  const currentClass = oTurn ? O_CLASS : X_CLASS
  placeMark(block, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  }else if (isDraw()){
    endGame(true)
  } else {
  swapTurns()
  setBoardHoverClass()
  }
};

function endGame(draw) {
  if (draw) {
    endBannerText.innerText = "Draw!"
  } else {
    endBannerText.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  endBanner.classList.add("show");
}

function isDraw() {
  return [...blockElements].every(block => {
    return block.classList.contains(X_CLASS) || 
    block.classList.contains(O_CLASS)
  })
}

function placeMark(block, currentClass) {
  block.classList.add(currentClass)
};

function swapTurns() {
  oTurn = !oTurn
}

function setBoardHoverClass() {
  container.classList.remove(X_CLASS)
  container.classList.remove(O_CLASS)
  if (oTurn) {
    container.classList.add(O_CLASS)
  } else {
    container.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return blockElements[index].classList.contains(currentClass)
    })
  })
}