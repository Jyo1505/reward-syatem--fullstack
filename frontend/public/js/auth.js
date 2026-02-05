// ================== REGISTER HELPERS ==================
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return false;

  const domain = email.split("@")[1].toLowerCase();

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "rediffmail.com"
  ];

  if (domain.endsWith(".ac.in") || domain.endsWith(".edu")) return true;

  return allowedDomains.includes(domain);
}

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

// ================== REGISTER ==================
async function register() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const confirmEl = document.getElementById("confirmPassword");
  const msg = document.getElementById("msg");

  if (!nameEl || !emailEl || !passwordEl || !confirmEl || !msg) return;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value;
  const confirmPassword = confirmEl.value;

  msg.style.color = "red";

  if (!isValidEmail(email)) {
    msg.innerText = "❌ Invalid email format";
    return;
  }

  if (!isStrongPassword(password)) {
    msg.innerText = "❌ Password must be strong";
    return;
  }

  if (password !== confirmPassword) {
    msg.innerText = "❌ Passwords do not match";
    return;
  }

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

// ================== PASSWORD STRENGTH ==================
document.getElementById("password")?.addEventListener("input", () => {
  const strength = document.getElementById("strength");
  if (!strength) return;

  const password = document.getElementById("password").value;

  if (isStrongPassword(password)) {
    strength.innerText = "Strong password ✅";
    strength.style.color = "green";
  } else {
    strength.innerText = "Weak password ❌";
    strength.style.color = "red";
  }
});

// ================== LOGIN ==================
async function login() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const msg = document.getElementById("msg");

  if (!emailEl || !passwordEl || !msg) return;

  const email = emailEl.value;
  const password = passwordEl.value;

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

// ================== PASSWORD TOGGLE ==================
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    el.textContent = "🙈";
  } else {
    input.type = "password";
    el.textContent = "👁️";
  }
}
