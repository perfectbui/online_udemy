document.querySelector(".nav-link.active").classList.remove("active");
document.querySelector(".nav-link.home").classList.add("active");

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

