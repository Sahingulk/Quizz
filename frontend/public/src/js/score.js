// const scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
// const scoreboardDiv = document.getElementById("scoreboard");


// if (scoreboard.length === 0) {
//   scoreboardDiv.innerHTML = "<div class='text-muted'>Skor verisi bulunamadı.</div>";
// } else {
//   scoreboardDiv.innerHTML = scoreboard
//     .sort((a, b) => b.score - a.score)
//     .map((p, idx) => `
//       <div class="d-flex justify-content-between align-items-center mb-2">
//         <span class="fw-bold">${idx+1}. ${p.username} 🏅</span>
//         <span class="badge bg-success fs-6">${p.score}</span>
//       </div>
//     `).join("");
// }

// score.js
const scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
const scoreboardDiv = document.getElementById("scoreboard");
const backBtn = document.getElementById("back-dashboard-btn");
const user = JSON.parse(localStorage.getItem("user"));
const pin = new URLSearchParams(window.location.search).get("pin");
const gamePin = localStorage.getItem("gamePin");


if (scoreboard.length === 0) {
    scoreboardDiv.innerHTML = "<div class='text-muted'>Skor verisi bulunamadı.</div>";
  } else {
    scoreboardDiv.innerHTML = scoreboard
      .sort((a, b) => b.score - a.score)
      .map((p, idx) => `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="fw-bold">${idx+1}. ${p.username} 🏅</span>
          <span class="badge bg-success fs-6">${p.score}</span>
        </div>
      `).join("");
  }

// Eğer bu kullanıcı HOST ise (oyunu başlatan)
if (gamePin && pin && gamePin === pin) {
  backBtn.style.display = "block";
  backBtn.onclick = () => {
    // Temizlik de yapılabilir
    localStorage.removeItem("gamePin");
    window.location.href = "dashboard.html";
  };
} else {
  backBtn.style.display = "none";
}
