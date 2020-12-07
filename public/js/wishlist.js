document.getElementById("btn-delete-wishlist-item").addEventListener("click",(event)=>{
    event.preventDefault();
    const idCourse = document.getElementsByClassName("wishlist-card")[0].id;
    axios({
        method: "delete",
        url: "/profile/student/wishlist/delete",
        data: { idCourse },
        headers: {
          "X-Requested-with": "XMLHttpRequest",
        },
      })
        .then((response) => {
          location.reload();
        //   alert("You delete feedback successful");
        })
        .catch((error) => console.log("Delete this course out of wishlist failed"));
})