// if(getCookie('headerAndPayload').length>0) {
//     console.log("da authenticated");
//     document.querySelector('.nav-item.dropdown').classList.remove('hide');
// }

document
    .getElementById("btn-search-course")
    .addEventListener("click", event => {
        event.preventDefault();
        const content = document.getElementById("input-search").value;
        window.location.href = "/search/keyword/" + content;
    });

if (getCookie("headerAndPayload").length > 0) {
    document.querySelector(".nav-item.dropdown").classList.remove("hide");
    document.querySelector(".nav-item.signin").classList.add("hide");
    document.querySelector(".nav-item.signup").classList.add("hide");
    if (parseJwt(getCookie("headerAndPayload")).isTeacher) {
        document
            .querySelector(".nav-item.upload-course")
            .classList.remove("hide");
        document
            .querySelector(".nav-item.profile-teacher")
            .classList.remove("hide");
    }
    if (parseJwt(getCookie("headerAndPayload")).isStudent) {
        document
            .querySelector(".nav-item.profile-student")
            .classList.remove("hide");
    }
    if (parseJwt(getCookie("headerAndPayload")).isAdmin) {
        document.querySelector(".nav-item.category").classList.remove("hide");
        document
            .querySelector(".nav-item.profile-admin")
            .classList.remove("hide");
        document
            .querySelector(".nav-item.list-student")
            .classList.remove("hide");
        document
            .querySelector(".nav-item.list-teacher")
            .classList.remove("hide");
        document
            .querySelector(".nav-item.list-course")
            .classList.remove("hide");
    }
}

// document.querySelector(".backdrop").addEventListener("click",(event)=>{
//   document.querySelector(".backdrop").classList.add("hide");
// })