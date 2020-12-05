document
  .getElementById("btn-add-wishlist")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const idCourse = document.getElementById("get-course-id").innerHTML;
    axios({
      method: "post",
      url: "/upload/wishlist",
      data: { idCourse },
      headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => {
        document.getElementById("btn-add-wishlist").style.color = "red";
      })
      .catch((error) =>   alert("You must login to add wishlist"));
  });

document.getElementById("btn-buy-now").addEventListener("click", (event) => {
  event.preventDefault();
  const idCourse = document.getElementById("get-course-id").innerHTML;
  axios({
    method: "post",
    url: "/upload/buyCourse",
    data: { idCourse },
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
  })
    .then((response) => {
      alert("You buy this course successful!");
    })
    .catch((error) =>   alert("You must login to buy this course"));
});

document
  .getElementById("btn-write-comment")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const idCourse = document.getElementById("get-course-id").innerHTML;
    const contentComment = document.getElementById("comment-content").value;
    if (getCookie("headerAndPayload").length > 0) {
      axios({
        method: "post",
        url: "/upload/comment",
        data: { idCourse, contentComment },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          location.reload();
          alert("You give feedback successful");
        })
        .catch((error) => console.log("give feedback failed"));
    } else {
      alert("You must login to give feedback");
    }
  });
