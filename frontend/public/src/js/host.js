
// host.js

const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quizId");

if (!token || !user || !quizId) {
  window.location.href = "dashboard.html";
}

const socket = io("http://localhost:5000/quiz");
const hostPinArea = document.getElementById("host-pin-area");
const hostPin = document.getElementById("host-pin");
const hostWaiting = document.getElementById("host-waiting");

// Host, oyunu başlatır ve PIN alır
socket.emit("start_game", { quizId, hostId: user.id, username: user.username }, (data) => {
  if (data.error) {
    hostWaiting.textContent = data.error;
    return;
  }
  hostPin.textContent = data.pin;
  hostPinArea.style.display = "";
  hostWaiting.style.display = "none";
  localStorage.setItem("gamePin", data.pin);
});

function goToGame() {
  // localStorage.removeItem("scoreboard"); // <<< BURADA SİL!
  // PIN'i alıp host-game.html'e yönlen
  window.location.href = `host-game.html?pin=${hostPin.textContent}`;
}

