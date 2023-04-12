async function signup(e) {
    try{
        e.preventDefault();

        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value,
            password: e.target.password.value

        }
        console.log("this is signupDetails ",signupDetails)
        const response  = await axios.post('http://localhost:3000/user/signup',signupDetails)
        console.log(response.status,"this is response status")
            if(response.status === 201){
                alert("succesfully signed up")
                window.location.href = "../Login/login.html" // change the page on successful login
            }
            else {
                throw new Error('Failed to login')
            }
            
    }catch(err){
        console.log(err)
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
        if (err.response.status === 400) {
            alert('User already exists, Please Login');
        } else {
            alert('Failed to sign up');
          }
    }
}