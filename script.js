let gameSeq = [];
let userSeq = [];

const btns = ["red", "green", "blue", "yellow"];
let started = false;
let locked = false;
let level = 0;
let highScore = 0;

const highScoreDisplay = document.querySelector("#highScore");
const h2 = document.querySelector("h2");
const startBtn = document.querySelector("#startBtn");
const body = document.body;

/* ---------- START (keyboard for desktop, button tap for mobile) ---------- */

function startGame() {
  if (started) return;

  started = true;
  startBtn.classList.add("hidden");
  levelUp();
}

document.addEventListener("keydown", startGame);

startBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  startGame();
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  locked = true; // ignore taps while the computer is showing the pattern

  h2.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);

  gameFlash(ranBtn);

  setTimeout(() => {
    locked = false;
  }, 320);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      highScoreDisplay.innerText = highScore;
    }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key or tap Start to try again.`;

    body.classList.add("shake", "flash-red");
    setTimeout(() => body.classList.remove("shake", "flash-red"), 400);

    reset();
  }
}

function btnPress() {
  if (!started || locked) return; // no input before start / mid-sequence

  let btn = this;
  userFlash(btn);

  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  locked = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.classList.remove("hidden");
}
