// ✅ Render backend base URL
// const BASE_URL = "https://reward-syatem-fullstack.onrender.com/api";

// get logged-in user
const user = JSON.parse(localStorage.getItem("user"));

// redirect if not logged in
if (!user || !user.id) {
  window.location.href = "login.html";
}

// fetch user details
fetch(`${BASE_URL}/users/${user.id}`)
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("name").innerText = data.name || "-";
    document.getElementById("email").innerText = data.email || "-";
    document.getElementById("uid").innerText = user.id;
    document.getElementById("points").innerText = data.points ?? 0;
    document.getElementById("points2").innerText = data.points ?? 0;
  })
  .catch(err => {
    console.error(err);
    alert("Session expired. Please login again.");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

// logout function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
