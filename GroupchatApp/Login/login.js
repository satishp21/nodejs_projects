function login(e) {
    e.preventDefault();

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    console.log(loginDetails, "this is login details")

    axios.post('http://localhost:3000/user/login',loginDetails).then(response => {
        if(response.status === 200 ){
            console.log(response)
            console.log(response.data,response.data.user, "this is response.data.user")
            localStorage.setItem('token', response.data.token);
            alert("login successfull")
            window.location.href = "../Chatpage/index.html" // change the page on successful login
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

function forgotpassword() {
    window.location.href = "../ForgotPassword/index.html"
}