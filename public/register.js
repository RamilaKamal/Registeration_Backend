
$("#btn").on("click", function() {
    let first = $("#firstname").val();
    let last = $("#lastname").val();
    let email = $("#e_address").val();
    let gender = $("#gender").val();
    let password = $("#password").val();
    if (last == "" && gender == "Select--") {
        alert("All fields are required");
    }
    else {
        let data = {
            firstName: first,
            lastName: last,
            email: email,
            gender: gender,
            password: password
        }
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => {
            res.json().then((data) => {
                console.log("Hiii --> ", data)
                if(data.status){
                    window.location.href = "http://localhost:3000";
                }
            })
        }) 
        .catch(error => console.log(error))
    }
})

const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

if (loggedIn) {
  window.location.href = 'http://localhost:3000/';
}
