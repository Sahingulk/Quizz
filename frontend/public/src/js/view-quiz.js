const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quizId");

async function fetchQuizDetail() {
  const res = await fetch(`${API_BASE}/quiz/${quizId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();
  const qDiv = document.getElementById("quiz-detail");
  if (!res.ok) return qDiv.innerHTML = "Quiz bulunamadı.";
  qDiv.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    ${data.questions.map((q, i) => `
      <div class="mb-3 p-2 border rounded">
        <div class="fw-bold">${i+1}. ${q.text}</div>
        <ul>
        ${q.options.map((opt, j) => `<li${j===q.correctIndex?' class="text-success fw-bold"':''}>${opt}${j===q.correctIndex?' ✓':''}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  `;
}
fetchQuizDetail();
