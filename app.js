/**
 * Bingo Caller — 75-ball (US classic).
 * Draws random numbers; players track on their own paper cards.
 * No dependencies, no build step.
 */

const MIN = 1;
const MAX = 75;
const LETTERS = ["B", "I", "N", "G", "O"]; // 15 numbers per letter

const currentLetter = document.getElementById("current-letter");
const currentNumber = document.getElementById("current-number");
const drawBtn = document.getElementById("draw-btn");
const undoBtn = document.getElementById("undo-btn");
const resetBtn = document.getElementById("reset-btn");
const showLetters = document.getElementById("show-letters");
const recentList = document.getElementById("recent-list");
const board = document.getElementById("board");
const boardCount = document.getElementById("board-count");

/** Numbers drawn so far, in order. */
let drawn = [];

/** Whether to display the letter (B/I/N/G/O) alongside numbers. */
let lettersVisible = localStorage.getItem("bingo.showLetters") !== "false";

function letterFor(n) {
  return LETTERS[Math.floor((n - MIN) / 15)];
}

function isDrawn(n) {
  return drawn.includes(n);
}

function draw() {
  const remaining = [];
  for (let n = MIN; n <= MAX; n++) {
    if (!isDrawn(n)) remaining.push(n);
  }
  if (remaining.length === 0) return;

  const n = remaining[Math.floor(Math.random() * remaining.length)];
  drawn.push(n);
  render();
}

function undo() {
  if (drawn.length === 0) return;
  drawn.pop();
  render();
}

function reset() {
  if (drawn.length > 0 && !confirm("Reset the game? All drawn numbers will be cleared.")) return;
  drawn = [];
  render();
}

function render() {
  document.body.classList.toggle("hide-letters", !lettersVisible);

  const last = drawn[drawn.length - 1];

  // Current draw
  if (last === undefined) {
    currentLetter.textContent = "–";
    currentNumber.textContent = "–";
  } else {
    currentLetter.textContent = letterFor(last);
    currentNumber.textContent = last;
  }

  // Last 5 draws, newest first
  recentList.innerHTML = "";
  drawn.slice(-5).reverse().forEach((n) => {
    const li = document.createElement("li");
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = letterFor(n);
    li.appendChild(letter);
    li.appendChild(document.createTextNode(n));
    recentList.appendChild(li);
  });

  // Board
  board.querySelectorAll(".board__cell").forEach((cell) => {
    const n = Number(cell.dataset.n);
    cell.classList.toggle("board__cell--hit", isDrawn(n));
  });

  boardCount.textContent = `(${drawn.length}/${MAX})`;
  drawBtn.disabled = drawn.length === MAX;
  undoBtn.disabled = drawn.length === 0;
}

function buildBoard() {
  const frag = document.createDocumentFragment();
  for (let n = MIN; n <= MAX; n++) {
    const cell = document.createElement("div");
    cell.className = "board__cell";
    cell.dataset.n = n;
    cell.textContent = n;
    cell.title = letterFor(n);
    frag.appendChild(cell);
  }
  board.appendChild(frag);
}

drawBtn.addEventListener("click", draw);
undoBtn.addEventListener("click", undo);
resetBtn.addEventListener("click", reset);
showLetters.addEventListener("change", () => {
  lettersVisible = showLetters.checked;
  localStorage.setItem("bingo.showLetters", lettersVisible);
  render();
});
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // avoid page scroll / button re-trigger
    draw();
  }
});

buildBoard();
showLetters.checked = lettersVisible;
render();
