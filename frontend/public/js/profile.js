const BASE_URL = "http://localhost:9000/api";
const user = JSON.parse(localStorage.getItem("user"));

fetch(`${BASE_URL}/users/${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("name").innerText = data.name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("points").innerText = data.points;
  });
