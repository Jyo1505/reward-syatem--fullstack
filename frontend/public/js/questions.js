const BASE_URL = "http://localhost:9000/api";
const user = JSON.parse(localStorage.getItem("user"));

async function postQuestion() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const res = await fetch(`${BASE_URL}/questions/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id, title, description })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.msg;
}

// load all questions
if (document.getElementById("questions")) {
  fetch(`${BASE_URL}/questions`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("questions").innerHTML = data.map(q =>
        `<div class="card" onclick="location.href='question.html?id=${q.id}'">
          <h3>${q.title}</h3>
          <p>${q.description.substring(0,100)}...</p>
          <small>By ${q.name}</small>
        </div>`
      ).join("");
    });
}
function logout(){
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
