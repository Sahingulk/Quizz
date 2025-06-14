const API_BASE = "http://localhost:5000/api/auth";

const form = document.getElementById("register-form");
const errorDiv = document.getElementById("register-error");
const successDiv = document.getElementById("register-success");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.style.display = "none";
  successDiv.style.display = "none";
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "student" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Kayıt başarısız");
    successDiv.textContent = "Kayıt başarılı! Giriş yapabilirsin.";
    successDiv.style.display = "block";
    form.reset();
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = "block";
  }
});
