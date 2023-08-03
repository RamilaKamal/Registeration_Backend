
function logOut() {
    window.location.href = "/login"
    localStorage.clear();
}

const isloggedIn = JSON.parse(localStorage.getItem('loggedIn'));

if (isloggedIn !== true) {
    console.log(isloggedIn);
    window.location.href = '/login';
}

