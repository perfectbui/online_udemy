// if(getCookie('headerAndPayload').length>0) {
//     console.log("da authenticated");
//     document.querySelector('.nav-item.dropdown').classList.remove('hide');
// }
if (getCookie("headerAndPayload").length > 0) {
    document.querySelector(".nav-item.dropdown").classList.remove("hide");
    document.querySelector(".nav-item.upload-course").classList.remove("hide");
    document.querySelector(".nav-item.signin").classList.add("hide");
    document.querySelector(".nav-item.signup").classList.add("hide");
  }