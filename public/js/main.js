// if(getCookie('headerAndPayload').length>0) {
//     console.log("da authenticated");
//     document.querySelector('.nav-item.dropdown').classList.remove('hide');
// }
if (getCookie("headerAndPayload").length > 0) {
  document.querySelector(".nav-item.dropdown").classList.remove("hide");
  document.querySelector(".nav-item.signin").classList.add("hide");
  document.querySelector(".nav-item.signup").classList.add("hide");
  if (parseJwt(getCookie("headerAndPayload")).isTeacher) {
    document.querySelector(".nav-item.upload-course").classList.remove("hide");
    document
      .querySelector(".nav-item.profile-teacher")
      .classList.remove("hide");
  }
  if (parseJwt(getCookie("headerAndPayload")).isStudent) {
    document
      .querySelector(".nav-item.profile-student")
      .classList.remove("hide");
  }
}

// document.querySelector(".backdrop").addEventListener("click",(event)=>{
//   document.querySelector(".backdrop").classList.add("hide");
// })