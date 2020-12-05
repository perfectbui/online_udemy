document.querySelector(".nav-link.active").classList.remove("active");
document.querySelector(".nav-link.profile-student").classList.add("active");

document
  .getElementById("btn-edit-profile-student")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const userName = document.getElementById("user-name-student").value;
    const age = document.getElementById("age-student").value;
    const degree = document.getElementById("degree-student").value;
    const phone = document.getElementById("phone-student").value;
    axios({
      method: "post",
      url: "/profile/student/edit",
      data: { userName, age, degree, phone },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        window.location.href = "/profile/student";
      })
      .catch((error) => console.log(error));
  });
