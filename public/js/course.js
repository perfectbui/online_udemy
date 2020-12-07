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
      .catch((error) => alert("You must login to add wishlist"));
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
    .catch((error) => alert("You must login to buy this course"));
});

document
  .getElementById("btn-give-feedback")
  .addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".backdrop").classList.add("hide");

    const rating = document.querySelector("input[name=exampleRadios]:checked")
      .value;
    const idCourse = document.getElementById("get-course-id").innerHTML;
    const contentComment = document.getElementById("comment-content").value;
    if (getCookie("headerAndPayload").length > 0) {
 
      axios({
        method: "get",
        url: "/profile",
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
            let dataUser=response.data.existedUser;
            if (
              dataUser.myCourses &&
              dataUser.myCourses.filter((course) => course._id == idCourse).length > 0
            ) {
              axios({
                method: "post",
                url: "/upload/comment",
                data: { idCourse, contentComment, rating },
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
              alert("You must buy this course to give feedback");
            }
        })
        .catch((error) => console.log("get data user failed"));
    } else {
      alert("You must login to give feedback");
    }
  });

document
  .getElementById("btn-write-comment")
  .addEventListener("click", (event) => {
    event.preventDefault();
    console.log("hehe");
    document.querySelector(".backdrop").classList.remove("hide");
  });
