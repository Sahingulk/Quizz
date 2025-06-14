const form = document.getElementById("join-form");
const errorDiv = document.getElementById("join-error");
const socket = io("http://localhost:5000/quiz");



form.addEventListener("submit", function(e) {
  e.preventDefault();
  errorDiv.style.display = "none";
  const pin = document.getElementById("join-pin").value.trim();
  const username = document.getElementById("join-username").value.trim();
  
  // Her tarayıcı sekmesinde farklı userId
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = Math.random().toString(36).substr(2, 9); // eşsiz random id
    localStorage.setItem("userId", userId);
  }
  localStorage.setItem("playerName", username);

  // Burada yönlendir:
  window.location.href = `player-game.html?pin=${pin}`;
});
