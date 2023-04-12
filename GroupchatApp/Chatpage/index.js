function addNewMessage(e){
    e.preventDefault();

    const message = e.target.message.value
    
    console.log(message)
    const token  = localStorage.getItem('token')
    const user = parseJwt(token)

    addNewMessagetoUI(message,user)
    

    // axios.post('http://localhost:3000/chat/addmessage',message,  { headers: {"Authorization" : token} })
    //     .then((response) => {
    //         // console.log(response,"this is the resposwe you are lookigng for")
    //     addNewMessagetoUI(response.data.expense);
    // }).catch(err => showError(err))
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// window.addEventListener('DOMContentLoaded', ()=> {
//     const token  = localStorage.getItem('token')
//     const decodeToken = parseJwt(token)
//     console.log(decodeToken)

//     .then(response => {
//             response.data.expenses.forEach(expense => {
//                 addNewMessagetoUI(expense);
//             })
//     }).catch(err => {
//         console.log(err)
//         showError(err)
//     })
// });

function addNewMessagetoUI(message,user){
    const parentElement = document.getElementById('listOfMessages');
    // const expenseElemId = `message-${message.id}`;
    parentElement.innerHTML += `
        <li>
            ${user.name} - ${message}
            <button onclick='deleteMessage(event, ${user.name})'>
                Delete message
            </button>
        </li>`
}

// function deleteMessage(e, expenseid) {
//     const token = localStorage.getItem('token')
//     axios.delete(`http://localhost:3000/chat/addmessage/${messageid}`,  { headers: {"Authorization" : token} }).then(() => {
//         removeExpensefromUI(expenseid);
//     }).catch((err => {
//         showError(err);
//     }))
// }

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(messageid){
    const messageElemId = `message-${messageid}`;
    document.getElementById(messageElemId).remove();
}

