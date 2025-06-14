

const urlParams = new URLSearchParams(window.location.search);
const pin = urlParams.get("pin");
const socket = io("http://localhost:5000/quiz");

const waitingArea = document.getElementById("waiting-area");
const playerList = document.getElementById("player-list");
const startQuizBtn = document.getElementById("startQuizBtn");
const gameArea = document.getElementById("game-area");
const questionArea = document.getElementById("question-area");
const nextBtn = document.getElementById("next-btn");
const timerDiv = document.getElementById("timer");
const feedbackDiv = document.getElementById("answer-feedback");

let questionIndex = 0;
let answerTimeout = null;

// Katılımcı listesi güncelle
socket.on("player_list", (players) => {
  playerList.innerHTML = players.map(p =>
    `<li class="list-group-item">${p.username}</li>`
  ).join("");
});

// Oyunu başlatınca ilk soru
startQuizBtn.onclick = () => {
  socket.emit("next_question", { pin }, () => {});
  waitingArea.style.display = "none";
  gameArea.style.display = "";
};

// Soru geldiğinde
socket.on("question", (q) => {
  showQuestion(q);
});

function showQuestion(q) {
  gameArea.style.display = "";
  questionArea.innerHTML = `<div class="fw-bold mb-2">${q.text}</div>`;
  nextBtn.style.display = "block";
  feedbackDiv.textContent = "";

  let seconds = q.timeLimit || 10;
  timerDiv.textContent = `Süre: ${seconds}`;
  if (answerTimeout) clearInterval(answerTimeout);
  answerTimeout = setInterval(() => {
    seconds--;
    timerDiv.textContent = `Süre: ${seconds}`;
    if (seconds <= 0) {
      clearInterval(answerTimeout);
    }
  }, 1000);
}

// Sonraki soru
nextBtn.onclick = () => {
  socket.emit("next_question", { pin }, (data) => {
    if (data.finished) {
      window.location.href = "score.html";
    }
  });
};

// Sadece finalde skor tablosuna geç
socket.on("scoreboard", (players) => {
  localStorage.setItem("scoreboard", JSON.stringify(players));
  setTimeout(() => window.location.href = "score.html", 1000);
});
