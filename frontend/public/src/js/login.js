const API_BASE = "http://localhost:5000/api/auth";

const form = document.getElementById("login-form");
const errorDiv = document.getElementById("login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.style.display = "none";
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Giriş başarısız");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = "block";
  }
});
