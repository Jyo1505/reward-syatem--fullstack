// ✅ Render backend API
// const BASE_URL = "https://reward-syatem-fullstack.onrender.com/api";

// get logged-in user
const user = JSON.parse(localStorage.getItem("user"));

// post new question
async function postQuestion() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    document.getElementById("msg").innerText = "Title and description are required";
    return;
  }

  const res = await fetch(`${BASE_URL}/questions/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.id,
      title,
      description
    })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.msg;
}

// load all questions
if (document.getElementById("questions")) {
  fetch(`${BASE_URL}/questions`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("questions").innerHTML = data.map(q => `
        <div class="card" onclick="location.href='question.html?id=${q.id}'">
          <h3>${q.title}</h3>
          <p>${q.description.substring(0, 100)}...</p>
          <small>By ${q.name}</small>
        </div>
      `).join("");
    })
    .catch(err => {
      console.error(err);
      document.getElementById("questions").innerHTML = "Failed to load questions";
    });
}

// logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
