// function addNewExpense(e){
//     e.preventDefault();

//     const expenseDetails = {
//         expenseamount: e.target.expenseamount.value,
//         description: e.target.description.value,
//         category: e.target.category.value,

//     }
//     console.log(expenseDetails)
//     const token  = localStorage.getItem('token')
//     axios.post('http://localhost:3000/expense/addexpense',expenseDetails,  { headers: {"Authorization" : token} })
//         .then((response) => {
//         addNewExpensetoUI(response.data.expense);
//     }).catch(err => showError(err))
// }

// function showPremiumuserMessage() {
//     document.getElementById('rzp-button1').style.visibility = "hidden"
//     document.getElementById('message').innerHTML = "You are a premium user "
// }

// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

// window.addEventListener('DOMContentLoaded', ()=> {
//     const token  = localStorage.getItem('token')
//     const decodeToken = parseJwt(token)
//     console.log(decodeToken)
//     const ispremiumuser = decodeToken.ispremiumuser
//     if(ispremiumuser){
//         showPremiumuserMessage()
//         showLeaderboard()
//     }
//     axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization" : token} })
//     .then(response => {
//             response.data.expenses.forEach(expense => {
//                 addNewExpensetoUI(expense);
//             })
//     }).catch(err => {
//         showError(err)
//     })
// });

// function addNewExpensetoUI(expense){
//     const parentElement = document.getElementById('listOfExpenses');
//     const expenseElemId = `expense-${expense.id}`;
//     parentElement.innerHTML += `
//         <li id=${expenseElemId}>
//             ${expense.expenseamount} - ${expense.category} - ${expense.description}
//             <button onclick='deleteExpense(event, ${expense.id})'>
//                 Delete Expense
//             </button>
//         </li>`
// }

// function deleteExpense(e, expenseid) {
//     const token = localStorage.getItem('token')
//     axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`,  { headers: {"Authorization" : token} }).then(() => {
//         removeExpensefromUI(expenseid);
//     }).catch((err => {
//         showError(err);
//     }))
// }

// function showError(err){
//     document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
// }
// function showLeaderboard(){
//     const inputElement = document.createElement("input")
//     inputElement.type = "button"
//     inputElement.value = 'Show Leaderboard'
//     inputElement.onclick = async() => {
//         const token = localStorage.getItem('token')
//         const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
//         console.log(userLeaderBoardArray)

//         var leaderboardElem = document.getElementById('leaderboard')
//         leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'
//         userLeaderBoardArray.data.forEach((userDetails) => {
//             leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses || 0} </li>`
//         })
//     }
//     document.getElementById("message").appendChild(inputElement);
// }

// function removeExpensefromUI(expenseid){
//     const expenseElemId = `expense-${expenseid}`;
//     document.getElementById(expenseElemId).remove();
// }

// document.getElementById('rzp-button1').onclick = async function (e) {
//     const token = localStorage.getItem('token')
//     const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
//     console.log(response);
//     var options =
//     {
//      "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
//      "order_id": response.data.order.id,// For one time payment
//      // This handler function will handle the success payment
//      "handler": async function (response) {
//         const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
//              order_id: options.order_id,
//              payment_id: response.razorpay_payment_id,
//          }, { headers: {"Authorization" : token} })
        
//         console.log(res)
//          alert('You are a Premium User Now')
//          document.getElementById('rzp-button1').style.visibility = "hidden"
//          document.getElementById('message').innerHTML = "You are a premium user "
//          localStorage.setItem('token', res.data.token)
//          showLeaderboard()
//      },
//   };
//   const rzp1 = new Razorpay(options);
//   rzp1.open();
//   e.preventDefault();

//   rzp1.on('payment.failed', function (response){
//     console.log(response)
//     alert('Something went wrong')
//  });
// }

const token = localStorage.getItem('token');
function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const expenseDetails = {
        expenseamount: form.get("expenseamount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails)
    axios.post('http://localhost:3000/expense/addexpense',expenseDetails, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))

}

window.addEventListener('load', ()=> {
    axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization" : token} }).then(response => {
        if(response.status === 200){
            response.data.expenses.forEach(expense => {
                addNewExpensetoUI(expense);
            })
        } else {
            throw new Error();
        }
    })
});

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}
function download(){
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}



document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "YAV Technology",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Yash Prasad",
       "email": "prasadyash2411@gmail.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}