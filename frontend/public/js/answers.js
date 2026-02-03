// ================= CONFIG =================
// const BASE_URL = "https://reward-syatem-fullstack.onrender.com/api";

// ================= AUTH & PARAMS =================
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first");
  window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const qid = params.get("id");

if (!qid) {
  alert("Invalid question");
  window.location.href = "questions.html";
}

// ================= LOAD QUESTION =================
fetch(`${BASE_URL}/questions/${qid}`)
  .then(res => res.json())
  .then(q => {
    document.getElementById("qtitle").innerText = q.title;
    document.getElementById("qdesc").innerText = q.description;
    document.getElementById("qname").innerText = q.name;
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load question");
  });

// ================= LOAD ANSWERS =================
function loadAnswers() {
  fetch(`${BASE_URL}/answers/${qid}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("answers").innerHTML = data.map(a => {

        let delBtn = "";
        if (a.user_id == user.id) {
          delBtn = `
            <button onclick="deleteAnswer(${a.id})"
              style="margin-top:8px;background:#e74c3c;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">
              Delete (-5 points)
            </button>
          `;
        }

        return `
          <div class="card">
            <b>${a.name}</b>
            <p>${a.content}</p>

            <div style="margin-top:8px;">
              <button onclick="upvote(${a.id})"
                style="background:#667eea;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">
                👍 Upvote
              </button>

              <button onclick="downvote(${a.id})"
                style="background:#444;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;margin-left:6px;">
                👎 Downvote
              </button>

              <span style="margin-left:10px;">Upvotes: ${a.upvotes}</span>
            </div>

            ${delBtn}
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load answers");
    });
}

loadAnswers();

// ================= ADD ANSWER =================
async function addAnswer() {
  const content = document.getElementById("answer").value.trim();

  if (!content) {
    alert("Answer cannot be empty");
    return;
  }

  const res = await fetch(`${BASE_URL}/answers/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user.id,
      question_id: qid,
      content
    })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.msg;
  document.getElementById("answer").value = "";
  loadAnswers();
}

// ================= DELETE ANSWER =================
async function deleteAnswer(id) {
  if (!confirm("Are you sure you want to delete this answer? (-5 points)")) return;

  const res = await fetch(`${BASE_URL}/answers/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id })
  });

  const data = await res.json();
  alert(data.msg);
  loadAnswers();
}

// ================= UPVOTE =================
async function upvote(id) {
  const res = await fetch(`${BASE_URL}/answers/upvote/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id })
  });

  const data = await res.json();
  alert(data.msg);
  loadAnswers();
}

// ================= DOWNVOTE =================
async function downvote(id) {
  const res = await fetch(`${BASE_URL}/answers/downvote/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id })
  });

  const data = await res.json();
  alert(data.msg);
  loadAnswers();
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
