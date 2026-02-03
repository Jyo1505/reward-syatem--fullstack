// ================== CONFIG ==================
// const BASE_URL = "https://reward-syatem-fullstack.onrender.com/api";

// ================== REGISTER ==================
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;

  const domain = email.split("@")[1].toLowerCase();

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "rediffmail.com",
    ".co.in",
    "edu.in"
  ];

  // allow college domains like .ac.in
  if (domain.endsWith(".ac.in") || domain.endsWith(".edu")) return true;

  return allowedDomains.includes(domain);
}

function isStrongPassword(password) {
  // min 8 chars, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("msg");

  msg.style.color = "red";

  if (!isValidEmail(email)) {
    msg.innerText = "❌ Invalid email format";
    return;
  }

  if (!isStrongPassword(password)) {
    msg.innerText = "❌ Password must be 8+ chars, uppercase, lowercase & number";
    return;
  }

  if (password !== confirmPassword) {
    msg.innerText = "❌ Password and confirm password do not match";
    return;
  }

  // ✅ Send to Render backend
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  msg.innerText = data.msg;

  if (res.ok) {
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
}

document.getElementById("password")?.addEventListener("input", () => {
  const p = document.getElementById("password").value;
  const s = document.getElementById("strength");

  if (!s) return;

  if (isStrongPassword(p)) {
    s.innerText = "Strong password ✅";
    s.style.color = "green";
  } else {
    s.innerText = "Weak password ❌ (8+ chars, upper, lower, number)";
    s.style.color = "red";
  }
});

// ================== LOGIN ==================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  msg.innerText = data.msg;

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  }
}


function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.textContent = "🙈";
  } else {
    input.type = "password";
    el.textContent = "👁️";
  }
}
