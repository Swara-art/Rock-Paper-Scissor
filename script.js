const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const moveBtn = document.getElementById("reset");
const userOptions = document.querySelectorAll(".option");

let userScore = 0;
let compScore = 0;
let gameOver = false;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randIndex = Math.floor(Math.random() * choices.length);
  return choices[randIndex];
}

function getResult(user, comp) {
  if (user === comp) return "draw";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return "user";
  }
  return "comp";
}

function endGame(winner) {
  gameOver = true;
  moveBtn.textContent = `${winner} wins the game! 🎉`;
  userOptions.forEach(opt => opt.style.pointerEvents = "none");

  setTimeout(() => {
    moveBtn.textContent = "Refresh to play again";
  }, 3000);
}

function playGame(userChoice) {
  if (gameOver || !userChoice) return;

  const compChoice = getComputerChoice();
  console.log("User:", userChoice, "| Computer:", compChoice);

  const result = getResult(userChoice, compChoice);

  if (result === "user") {
    userScore++;
    userScoreEl.textContent = userScore;
    moveBtn.textContent = `You Win! ${userChoice} beats ${compChoice}`;
  } else if (result === "comp") {
    compScore++;
    compScoreEl.textContent = `You Lose! ${compChoice} beats ${userChoice}`;
    compScoreEl.textContent = compScore;
  } else {
    moveBtn.textContent = `Draw! You both chose ${userChoice}`;
  }

  if (userScore === 10) {
    endGame("You");
  } else if (compScore === 10) {
    endGame("Computer");
  } else {
    setTimeout(() => {
      if (!gameOver) moveBtn.textContent = "Pick your move";
    }, 2000);
  }
}

userOptions.forEach(option => {
  option.addEventListener("click", () => {
    if (gameOver) return;
    const userChoice = option.getAttribute("data-choice");
    if (!userChoice) return;
    playGame(userChoice);
  });
});
