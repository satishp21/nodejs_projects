async function addExpense(event) {
    event.preventDefault();
    const expenseAmt = event.target.expenseAmt.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const token = localStorage.getItem('token')

    const expenseDetails = {
        expenseAmt,
        description,
        category
    }
    try {
            
        const res = await axios.post('http://localhost:3000/user/insert-expense',expenseDetails,{headers: { 'Authorization' : token}})
        console.log(res)
        if(res.status == 201){
            showexpenseonScreen(res.data.expenseCreated);
        }
        
    } catch (error) {
        console.log(error)
    }

    document.getElementById('expAmt').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('category').value = '';
}

window.addEventListener('DOMContentLoaded', async function() {
    try{
    const token = localStorage.getItem('token')
    const listOfUsers = document.getElementById('expenses')
        
    let response = await axios.post('http://localhost:3000/user/get-expenses',{headers: { 'Authorization' : token}})

    console.log("this is"+response);
    if(response.status === 200){
        listOfUsers.innerHTML = ''
        for(let i=0;i<response.data.data.length;i++){
            console.log(response.data.data[i])
            showexpenseonScreen(response.data.data[i]);
        }
    }
    }catch (error) {
        console.log(error, "error came")
    }
})

function showexpenseonScreen(expense){
    const parentNode = document.getElementById('expenses');
    const childHTML = `<li id=${expense.id} class="expense-list-item">  ${expense.expenseAmt} : ${expense.description} : ${expense.category}
    <button onClick=deleteExpense("${expense._id}") class="action-btn">Delete Expense</button>
    <button onclick=editExpense("${expense._id}","${expense.category}","${expense.expenseAmt}","${expense.description}") class="edit-btn">Edit Expense</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

    document.getElementById('expAmt').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('category').value = '';
}

function editExpense(userId,category,expenseAmt,desc){
    document.getElementById('expAmt').value = expenseAmt;
    document.getElementById('desc').value = desc;
    document.getElementById('category').value = category;
    deleteExpense(userId);
}

function deleteExpense(expenseid){
    const token = localStorage.getItem('token')
    console.log(expenseid)
    axios.delete(`http://localhost:3000/deleteexpense/${expenseid}`, {headers: {"Authorization": token}})
    .then(res => {
        removeexpensefromScreen(expenseid);
    })
    .catch(error =>{
        console.log(error)
    })
    // localStorage.removeItem(category);
    // removeexpensefromScreen(category);
}

function removeexpensefromScreen(userId){
    const parentNode = document.getElementById('expenses');
    const deleteChild = document.getElementById(userId);
    if(deleteChild){
        parentNode.removeChild(deleteChild);
    }
}