document.querySelector('.nav-link.active').classList.remove('active');
document.querySelector('.nav-link.signin').classList.add('active');

// console.log(parseJwt(getCookie(document.cookie)));

document.querySelector('.btn-sign-up').addEventListener('click',(event)=> {
    event.preventDefault();
    window.location.href="signup";
})

// function redirectToSignUp(event) {
//     event.preventDefault();
//     console.log("haha");
//     window.location.href="signup";
// }

