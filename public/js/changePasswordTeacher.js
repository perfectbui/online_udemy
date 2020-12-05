document
  .getElementById("btn-change-password-teacher")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const oldPassword = document.getElementById("old-password-teacher").value;
    const newPassword = document.getElementById("new-password-teacher").value;
    axios({
      method: "post",
      url: "/profile/teacher/change-password",
      data: { oldPassword, newPassword },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        window.location.href = "/profile/teacher";
      })
      .catch((error) => {
        alert("Please enter the correct information");
      });
  });
