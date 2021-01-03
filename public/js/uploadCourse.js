document.querySelector(".nav-link.active").classList.remove("active");
document.querySelector(".nav-link.upload-course").classList.add("active");

// document.querySelector(".post-detail").addEventListener("click", (event) => {
//   event.preventDefault();
//   let htmlToLoad = tinyMCE.get("editor").getContent();
//   console.log(htmlToLoad);
// });

let videoQuantity = 0;
let videosTitle = [];
let videosFile = [];

document.querySelector(".add-video").addEventListener("click", event => {
  event.preventDefault();
  const id = "container-video-" + videoQuantity
  document.getElementById(id).classList.remove("hide")
  videoQuantity++;
})

document
  .querySelector(".btn-upload-course")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "image",
      document.getElementById("image-course").files[0]
    );
    await axios({
      method: "post",
      url: "/upload/image",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-with": "XMLHttpRequest",
      },
    })
      .then(async (response) => {
        const image = response.data.imageUrl;
        for (let i = 0; i < videoQuantity; i++) {
          let formData1 = new FormData();
          const idVid = "video-course-" + i;
          const idVidTitle = "name-video-course-" + i;
          formData1.append(
            "videoFile",
            document.getElementById(idVid).files[0]
          );
          videosTitle.push(document.getElementById(idVidTitle).value)
          await axios({
            method: "post",
            url: "/upload/video",
            data: formData1,
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Requested-with": "XMLHttpRequest",
            },
          }).then(async (response) => {
            videosFile.push(response.data.videoLocation)
          }).catch(error => console.log(error))
        }
        let video = []
        console.log(videosFile)
        console.log(videosTitle)
        for (let i = 0; i < videoQuantity; i++) {
          video.push({ location: videosFile[i], title: videosTitle[i] })
        }
        const price = document.getElementById("price-course").value;
        // const field = document.getElementById("field-course").value;
        const field = document.getElementById("category-course").value;
        const name = document.getElementById("name-course").value;
        const mainContent = document.getElementById("main-content").value;
        const detailContent = tinyMCE.get("editor").getContent();
        const previewContent = tinyMCE.get("editor1").getContent();
        const isCourseDone = document.getElementById("input-done-course").checked ? true : false;
        // console.log("video")
        // console.log(video)
        await axios({
          method: "post",
          url: "/upload/course",
          data: { name, price, image, video, field, mainContent, detailContent, previewContent, isDone: isCourseDone },
          headers: {
            "X-Requested-with": "XMLHttpRequest",
          },
        })
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
      )
      .catch((error) => console.log(error));
  });




    // if (document.getElementById("image-course")) {
    //   const formData = new FormData();
    //   formData.append(
    //     "image",
    //     document.getElementById("image-course").files[0]
    //   );
    //   axios({
    //     method: "post",
    //     url: "/upload/image",
    //     data: formData,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "X-Requested-with": "XMLHttpRequest",
    //     },
    //   })
    //     .then((response) => {
    //       const image = response.data.imageUrl;
    //       if (document.getElementById("video-course")) {
    //         const formData = new FormData();
    //         formData.append(
    //           "videoFile",
    //           document.getElementById("video-course").files[0]
    //         );
    //         axios({
    //           method: "post",
    //           url: "/upload/video",
    //           data: formData,
    //           headers: {
    //             "Content-Type": "multipart/form-data",
    //             "X-Requested-with": "XMLHttpRequest",
    //           },
    //         }).then(response => {
    //           const price = document.getElementById("price-course").value;
    //           // const field = document.getElementById("field-course").value;
    //           const field = document.getElementById("category-course").value;
    //           const name = document.getElementById("name-course").value;
    //           const mainContent = document.getElementById("main-content").value;
    //           const detailContent = tinyMCE.get("editor").getContent();
    //           const previewContent = tinyMCE.get("editor1").getContent();
    //           const isCourseDone = document.getElementById("input-done-course").checked ? true : false;
    //           axios({
    //             method: "post",
    //             url: "/upload/course",
    //             data: { name, price, image, field, mainContent, detailContent, previewContent, isDone: isCourseDone },
    //             headers: {
    //               "X-Requested-with": "XMLHttpRequest",
    //             },
    //           })
    //             .then((response) => {
    //               window.location.reload();
    //             })
    //             .catch((error) => console.log(error));
    //         }).catch(error => console.log(error))
    //       }
    //     })
    //     .catch((error) => console.log(error));
    // }