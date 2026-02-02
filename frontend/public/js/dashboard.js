const BASE_URL = "http://localhost:9000/api";
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

fetch(`${BASE_URL}/users/${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("uid").innerText = user.id;
    document.getElementById("points").innerText = data.points;
    document.getElementById("points2").innerText = data.points;
  });

function logout(){
  localStorage.removeItem("user");
}
