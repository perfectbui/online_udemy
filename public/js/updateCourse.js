document.querySelector(".nav-link.active").classList.remove("active");
document.querySelector(".nav-link.profile-teacher").classList.add("active");


document
  .querySelector(".btn-update-course")
  .addEventListener("click", (event) => {
    event.preventDefault();
    if (document.getElementById("image-course")) {
      const formData = new FormData();
      formData.append(
        "image",
        document.getElementById("image-course").files[0]
      );
      axios({
        method: "post",
        url: "/upload/image",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          const idCourse = document.getElementById("get-course-id").innerHTML;
          const image = response.data.imageUrl;
          const price = document.getElementById("price-course").value;
          const field = document.getElementById("category-course").value;
          const name = document.getElementById("name-course").value;
          const mainContent = document.getElementById("main-content").value;
          const detailContent = tinyMCE.get("editor").getContent();
          const previewContent = tinyMCE.get("editor1").getContent();
          const isCourseDone =  document.getElementById("input-done-course").checked ? true : false;
          console.log(isCourseDone);
          axios({
            method: "post",
            url: "/update/course",
            data: {
              idCourse,
              name,
              price,
              image,
              field,
              mainContent,
              detailContent,
              previewContent,
              isDone:isCourseDone
            },
            headers: {
              "X-Requested-with": "XMLHttpRequest",
            },
          })
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  });
