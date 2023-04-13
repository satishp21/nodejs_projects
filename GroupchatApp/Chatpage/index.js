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

    let messages = JSON.parse(localStorage.getItem("myArray")) || [];
    console.log(messages,'this is JSON.parse(localStorage.getItem("messages"))')
    if(messages == undefined || messages.length == 0){
      lastMsgId = 0;
    }
    else {
      lastMsgId = messages[messages.length - 1].id;
      messages.forEach(mess => {
        addNewMessagetoUI(mess.message,mess)
      })
    }

    setInterval(() => {
        axios.get(`http://localhost:3000/chat/getmessage/${lastMsgId}`, { headers: {"Authorization" : token} })
          .then(response => {
            console.log(response,"this is the response u r looking for")
            response.data.messages.forEach(resmessage => {
                console.log(resmessage.id,"this is message.id")
                if (resmessage.id > lastMsgId) {
                    console.log(resmessage,"message")
                    console.log(resmessage.message,"message.message")
                    messages.push(resmessage)
                    if (messages.length > 10){ // this will keep only letest 10 messages in local storages
                        messages.shift()       //removes 0 th element of the array
                    }
                    addNewMessagetoUI(resmessage.message,resmessage)
                    lastMsgId = resmessage.id;
                  }
                console.log(messages,"this is messageArray")
                localStorage.setItem("myArray", JSON.stringify(messages))
            })
          })
          .catch(err => {
            console.log(err)
            showError(err)
          });
      }, 3000);
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





