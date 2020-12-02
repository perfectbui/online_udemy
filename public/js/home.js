document.querySelector(".nav-link.active").classList.remove("active");
document.querySelector(".nav-link.home").classList.add("active");

if (getCookie("headerAndPayload").length > 0) {
  document.querySelector(".nav-item.dropdown").classList.remove("hide");
  document.querySelector(".nav-link upload-course").classList.remove("hide");
  document.querySelector(".nav-item.signin").classList.add("hide");
  document.querySelector(".nav-item.signup").classList.add("hide");
}

var activities = document.getElementById("filter");

activities.addEventListener("change", function() {
    if(activities.value == "rating")
    {
        alert("Rating");
    }
    if(activities.value == "price")
    {
        alert("Price");
    }
});

