// Backend base URL (Render)
// const BASE_URL = "https://reward-syatem-fullstack.onrender.com/api";

// Get logged-in user
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  // Safety: if user not logged in
  window.location.href = "login.html";
}

// Fetch user profile
fetch(`${BASE_URL}/users/${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("points").innerText = data.points;
  })
  .catch(err => {
    console.error("Failed to load profile:", err);
    alert("Unable to load profile. Please try again.");
  });
