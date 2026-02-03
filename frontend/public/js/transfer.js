// BASE_URL comes from config.js
const user = JSON.parse(localStorage.getItem("user"));
const msg = document.getElementById("msg");

// protect route
if (!user) {
  window.location.href = "login.html";
}

// load users into dropdown
fetch(`${BASE_URL}/users/list/${user.id}`)
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("receiver");
    select.innerHTML = `<option value="">Select user</option>`;

    data.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u.id;           // internal ID
      opt.textContent = u.name;   // visible name
      select.appendChild(opt);
    });
  })
  .catch(() => {
    msg.innerText = "❌ Failed to load users";
    msg.style.color = "red";
  });

// transfer points
async function transfer() {
  const receiver = document.getElementById("receiver").value;
  const points = document.getElementById("points").value;

  msg.style.color = "red";

  if (!receiver) {
    msg.innerText = "❌ Please select a user";
    return;
  }

  if (!points || points <= 0) {
    msg.innerText = "❌ Enter valid points";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/transfers/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: user.id,
        receiver: Number(receiver),
        points: Number(points)
      })
    });

    const data = await res.json();
    msg.innerText = data.msg;
    msg.style.color = res.ok ? "green" : "red";
  } catch (err) {
    msg.innerText = "❌ Server not reachable";
    msg.style.color = "red";
  }
}
