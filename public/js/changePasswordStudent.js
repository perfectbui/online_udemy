document
  .getElementById("btn-change-password-student")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const oldPassword = document.getElementById("old-password-student").value;
    const newPassword = document.getElementById("new-password-student").value;
    axios({
      method: "post",
      url: "/profile/student/change-password",
      data: { oldPassword, newPassword },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        window.location.href = "/profile/student";
      })
      .catch((error) => {
        alert("Please enter the correct information");
      });
  });
