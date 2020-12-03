document.querySelector('.nav-link.active').classList.remove('active');
document.querySelector('.nav-link.signin').classList.add('active');

// console.log(parseJwt(getCookie(document.cookie)));

document.querySelector('.btn-sign-up-teacher').addEventListener('click',(event)=> {
    event.preventDefault();
    window.location.href="/signup/teacher";
})

document.querySelector('.btn-sign-up-student').addEventListener('click',(event)=> {
    event.preventDefault();
    window.location.href="/signup/student";
})

// function redirectToSignUp(event) {
//     event.preventDefault();
//     console.log("haha");
//     window.location.href="signup";
// }

