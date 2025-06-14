const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
  window.location.href = "login.html";
}

document.getElementById("dashboard-username").textContent = user.username;

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Quizleri kullanıcıya özel getir
async function fetchMyQuizzes() {
  const quizListDiv = document.getElementById("quizzes");
  quizListDiv.innerHTML = `<div class="text-muted">Yükleniyor...</div>`;

  try {
    const res = await fetch(`${API_BASE}/quiz/my`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Quizler alınamadı");

    quizListDiv.innerHTML = "";
    if (data.quizzes.length === 0) {
      quizListDiv.innerHTML = `<div class="text-muted">Hiç quizin yok.</div>`;
      return;
    }

    data.quizzes.forEach(q => {
      quizListDiv.innerHTML += `
        <div class="card mb-2 shadow-sm p-2 rounded-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="fw-bold" style="color:#3F51B5;">${q.title}</span>
              <span class="text-muted ms-2">${q.description || ""}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-danger me-2" onclick="deleteQuiz('${q._id}')">Sil</button>
              <button class="btn btn-sm btn-success me-2" onclick="startGame('${q._id}')">Oyun Başlat</button>
              <button class="btn btn-sm btn-secondary" onclick="viewQuiz('${q._id}')">Görüntüle</button>
            </div>
          </div>
        </div>
      `;
    });
  } catch (err) {
    quizListDiv.innerHTML = `<div class="text-danger">${err.message}</div>`;
  }
}

// Quiz silme fonksiyonu
function deleteQuiz(quizId) {
  if (!confirm("Quiz silinsin mi?")) return;
  fetch(`${API_BASE}/quiz/${quizId}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Quiz silindi");
      fetchMyQuizzes();
    })
    .catch(() => alert("Quiz silinemedi!"));
}

// Quiz oluşturma işlemleri
const quizForm = document.getElementById("quiz-create-form");
const questionsArea = document.getElementById("questions-area");
let questions = [];

function addQuestion() {
  const index = questions.length;
  questions.push({ text: '', options: ['', '', '', ''], correctIndex: 0 });
  renderQuestions();
}

function renderQuestions() {
  questionsArea.innerHTML = questions.map((q, i) => `
    <div class="mb-3 p-2 border rounded">
      <input type="text" class="form-control mb-1" placeholder="Soru" value="${q.text}" onchange="updateQText(${i}, this.value)">
      ${q.options.map((opt, j) => `
        <div class="input-group mb-1">
          <input type="text" class="form-control" placeholder="Şık ${j + 1}" value="${opt}" onchange="updateQOpt(${i}, ${j}, this.value)">
          <span class="input-group-text">
            <input type="radio" name="correct-${i}" ${q.correctIndex === j ? 'checked' : ''} onchange="setQCorrect(${i}, ${j})"> Doğru
          </span>
        </div>
      `).join('')}
      <div class="input-group mb-1">
        <span class="input-group-text">Süre (sn)</span>
        <input type="number" min="3" max="120" class="form-control" value="${q.timeLimit || 10}" onchange="setQTimeLimit(${i}, this.value)">
      </div>
    </div>
  `).join('');
}
window.setQTimeLimit = (i, val) => questions[i].timeLimit = parseInt(val) || 10;



window.addQuestion = addQuestion;
window.updateQText = (i, val) => questions[i].text = val;
window.updateQOpt = (i, j, val) => questions[i].options[j] = val;
window.setQCorrect = (i, j) => questions[i].correctIndex = j;

quizForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  const title = document.getElementById("quiz-title").value.trim();
  const description = document.getElementById("quiz-desc").value.trim();

  if (!title || questions.length === 0 || questions.some(q => !q.text || q.options.some(opt => !opt))) {
    alert("Tüm soruları ve şıkları doldurun!");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, questions })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Quiz oluşturulamadı");

    alert("Quiz oluşturuldu!");
    quizForm.reset();
    questions = [];
    renderQuestions();
    fetchMyQuizzes();
  } catch (err) {
    alert(err.message);
  }
});

function startGame(quizId) {
  window.location.href = `host.html?quizId=${quizId}`;
}

async function viewQuiz(quizId) {
  const modal = new bootstrap.Modal(document.getElementById('quizDetailModal'));
  const modalBody = document.getElementById('quiz-detail-body');
  modalBody.innerHTML = "Yükleniyor...";

  try {
    const res = await fetch(`${API_BASE}/quiz/${quizId}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Quiz bulunamadı");

    const html = `
      <h5 class="mb-3">${data.quiz.title}</h5>
      <div class="mb-2 text-muted">${data.quiz.description || ''}</div>
      <div>
        ${data.quiz.questions && data.quiz.questions.length > 0
          ? data.quiz.questions.map((q, i) => `
            <div class="card mb-3">
              <div class="card-body">
                <div class="fw-bold mb-2">${i + 1}. ${q.text}</div>
                <ul class="list-group mb-2">
                  ${q.options.map((opt, idx) => `
                    <li class="list-group-item${idx === q.correctIndex ? ' list-group-item-success' : ''}">
                      ${String.fromCharCode(65 + idx)} - ${opt}
                      ${idx === q.correctIndex ? '<span class="badge bg-success ms-2">Doğru</span>' : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `).join('')
          : '<div class="text-muted">Soru eklenmemiş.</div>'
        }
      </div>
    `;
    modalBody.innerHTML = html;
    modal.show();
  } catch (err) {
    modalBody.innerHTML = `<div class="text-danger">${err.message}</div>`;
    modal.show();
  }
}

fetchMyQuizzes();
