document
  .getElementById("btn-edit-profile-teacher")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const userName = document.getElementById("user-name-teacher").value;
    const age = document.getElementById("age-teacher").value;
    const degree = document.getElementById("degree-teacher").value;
    const phone = document.getElementById("phone-teacher").value;
    const address = document.getElementById("address-teacher").value;
    axios({
      method: "post",
      url: "/profile/teacher/edit",
      data: { userName, age, degree, phone ,address },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        window.location.href = "/profile/teacher";
      })
      .catch((error) => console.log(error));
  });
