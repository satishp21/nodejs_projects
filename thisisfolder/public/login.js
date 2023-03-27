async function signUp(event) {
    event.preventDefault();
    const email = event.target.emailId.value;
    const password = event.target.password.value;

    const obj = {
        email,
        password
    }

    try {
        const res = await axios.post('http://localhost:3000/user/login',obj)
        console.log(res.data.token)
        localStorage.setItem('token',res.data.token)
        if(res.status === 200){
            window.location.href = './expense.html'
        }
        
    } catch (error) {
        console.log(error, "error came")
    }
}