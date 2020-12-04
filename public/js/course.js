document.getElementById("btn-add-watch-list").addEventListener("click",(event)=>{
    event.preventDefault();
    const idCourse= document.getElementById("get-course-id").innerHTML;
    axios({
        method: "post",
        url: "/upload/watchlist",
        data: {idCourse},
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      }).then(response => {
        document.getElementById("btn-add-watch-list").style.color = "red";
      })
      .catch(error => console.log("add watch list failed"))
})

document.getElementById("btn-buy-now").addEventListener("click",(event)=>{
    event.preventDefault();
    const idCourse= document.getElementById("get-course-id").innerHTML;
    axios({
        method: "post",
        url: "/upload/buyCourse",
        data: {idCourse},
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      }).then(response => {
        alert("You buy this course successful!")
      })
      .catch(error => console.log("add watch list failed"))
})