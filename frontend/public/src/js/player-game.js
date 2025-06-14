// frontend/public/src/js/player-game.js
const urlParams = new URLSearchParams(window.location.search);
const pin = urlParams.get("pin");
const user = JSON.parse(localStorage.getItem("user"));
// const userId = user?.id || localStorage.getItem("userId");
// const username = user?.username || localStorage.getItem("playerName");

const userId = localStorage.getItem("userId");
const username = localStorage.getItem("playerName");

const socket = io("http://localhost:5000/quiz");

const waitingArea = document.getElementById("waiting-area");
const gameArea = document.getElementById("game-area");
const questionArea = document.getElementById("question-area");
const optionsArea = document.getElementById("options-area");
const feedbackDiv = document.getElementById("answer-feedback");
const timerDiv = document.getElementById("timer");

let answered = false;
let answerTimeout = null;

// Katılımcı oyuna katıldı
socket.emit("join_game", { pin, userId, username }, () => {});

// Soru geldiğinde
socket.on("question", (q) => {
  waitingArea.style.display = "none";
  gameArea.style.display = "";
  showQuestion(q);
});

function showQuestion(q) {
    questionArea.innerHTML = `<div class="fw-bold mb-2">${q.text}</div>`;
    optionsArea.innerHTML = "";
    feedbackDiv.textContent = "";
    answered = false;
  
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-primary w-100 mb-2";
      btn.textContent = opt;
      btn.onclick = () => answer(idx);
      optionsArea.appendChild(btn);
    });
  
    // Soruya özel süre kullan
    let seconds = q.timeLimit || 10;
    timerDiv.textContent = `Süre: ${seconds}`;
    if (answerTimeout) clearInterval(answerTimeout);
    answerTimeout = setInterval(() => {
      seconds--;
      timerDiv.textContent = `Süre: ${seconds}`;
      // Son 3 saniyede tık tık sesi (ding vb.)
      if (seconds <= 3 && seconds > 0) {
        playSound("/src/assets/music/tick.mp3");
      }
      if (seconds <= 0) {
        clearInterval(answerTimeout);
        if (!answered) answer(-1);
      }
    }, 1000);
    
  }
  

// Cevap gönder
function playSound(src) {
    const audio = new Audio(src);
    audio.volume = 0.7;
    audio.play();
  }
  
  function answer(idx) {
    if (answered) return;
    answered = true;

    if (answerTimeout) clearInterval(answerTimeout); // <-- BU SATIRI EKLE

    Array.from(optionsArea.children).forEach(btn => btn.disabled = true);
    feedbackDiv.textContent = "Cevabınız gönderildi. Diğerlerini bekliyoruz...";
    socket.emit("answer", { pin, userId, answerIndex: idx }, (data) => {
      if (data.error) {
        feedbackDiv.textContent = data.error;
        playSound("/src/assets/music/yanlış.mp3");
        return;
      }
      if (data.correct) {
        feedbackDiv.textContent = "Doğru cevap! 🎉 (Sonuç birazdan)";
        playSound("/src/assets/music/dogru.mp3");
      } else {
        feedbackDiv.textContent = `Yanlış cevap! Doğru: ${data.correctIndex + 1} (Sonuç birazdan)`;
        playSound("/src/assets/music/yanlış.mp3");
      }
    });
}





// 1. Skor tablosuna geç
socket.on("scoreboard", (players) => {
    localStorage.setItem("scoreboard", JSON.stringify(players));
    window.location.href = "score.html?pin=" + pin; // pin parametresi ile
});
