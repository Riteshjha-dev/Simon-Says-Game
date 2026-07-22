let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;
let highScore = 0;
let highScoreDisplay = document.querySelector("#highScore");

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  console.log(gameSeq);
  //   console.log(ranIdx);
  //   console.log(ranColor);
  //   console.log(ranBtn);
  gameFlash(ranBtn);
}

function checkAns(idx) {
  //   console.log("cirrent level", level);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      highScoreDisplay.innerText = highScore;
    }
    // if (level - 1 > highScore) {
    //   highScore = level - 1;
    //   highScoreDisplay.innerText = highScore;
    // }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 500);
    reset();
  }
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  //   console.log(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
