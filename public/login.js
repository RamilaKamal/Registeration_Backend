
$("#login-btn").on("click", function () {
    let email = $("#email-address").val();
    let password = $("#password").val();
    let userData = { 
        email: email,
        password: password
    }
    // console.log("data -->", userData);
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    }).then(res => {
        res.json().then((res) => {
            console.log("userData --> ", res)
            if(!res.message){
                window.location.href = "/";
                localStorage.setItem("Data", JSON.stringify(userData));
                localStorage.setItem("loggedIn", JSON.stringify(true));
                console.log(localStorage)                

            } else {
                alert(res.message)
                if(res.message === "You are not Authorized!") {
                    window.location.href = '/register'
                }
            }
        })
        .catch(error => console.log(error))
    })
})

const isloggedIn = JSON.parse(localStorage.getItem('loggedIn'));

if (isloggedIn) {
  window.location.href = 'http://localhost:3000/';
}
