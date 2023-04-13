function addNewMessage(e){
    e.preventDefault();

    const message = {
        message : e.target.message.value
    }
    
    console.log(message)
    const token  = localStorage.getItem('token')
    const user = parseJwt(token)
    
    axios.post('http://localhost:3000/chat/addmessage',message,  { headers: {"Authorization" : token} })
        .then((response) => {
            console.log(response,"this is the resposwe you are lookigng for")
            // addNewMessagetoUI(response.data.chat.message,user);
    }).catch(err => showError(err))
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener('DOMContentLoaded', (e)=> {
    e.preventDefault();
    const token  = localStorage.getItem('token')
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    let lastTimestamp = 0;
    setInterval(() => {
        axios.get('http://localhost:3000/chat/getmessage', { headers: {"Authorization" : token} })
          .then(response => {
            console.log(response,"this is the response u r looking for")
            response.data.messages.forEach(message => {
                console.log(message.id,"this is message.id")
                if (message.id > lastTimestamp) {
                    console.log(message,"message")
                    console.log(message.message,"message.message")
                    addNewMessagetoUI(message.message, message);
                    lastTimestamp = message.id;
                  }
            })
          })
          .catch(err => {
            console.log(err)
            showError(err)
          });
      }, 1000);
    // setInterval(
    // axios.get('http://localhost:3000/chat/getmessage', { headers: {"Authorization" : token} })
    // .then(response => {
    //         console.log(response,"this is the response u r looking for")
    //         response.data.messages.forEach(message => {
    //             console.log(message,"message")
    //             console.log(message.message,"message.message")
    //             addNewMessagetoUI(message.message,message);
    //         })
    //         // console.log("this is response.data",response.data)
    // }).catch(err => {
    //     console.log(err)
    //     showError(err)
    // }),1000)
});

function addNewMessagetoUI(message,user){
    const parentElement = document.getElementById('listOfMessages');
    // const expenseElemId = `message-${message.id}`;
    parentElement.innerHTML += `
        <li>
            ${user.name} - ${message}
        </li>`
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

// delete button needs modification not working
// function addNewMessagetoUI(message,user){
//     const parentElement = document.getElementById('listOfMessages');
//     // const expenseElemId = `message-${message.id}`;
//     parentElement.innerHTML += `
//         <li>
//             ${user.name} - ${message}
//             <button onclick='deleteMessage(event, ${message.id})'>
//                 Delete message
//             </button>
//         </li>`
// }

// function deleteMessage(e, expenseid) {
//     const token = localStorage.getItem('token')
//     axios.delete(`http://localhost:3000/chat/addmessage/${messageid}`,  { headers: {"Authorization" : token} }).then(() => {
//         removeExpensefromUI(expenseid);
//     }).catch((err => {
//         showError(err);
//     }))
// }

// function removeExpensefromUI(messageid){
//     const messageElemId = `message-${messageid}`;
//     document.getElementById(messageElemId).remove();
// }





