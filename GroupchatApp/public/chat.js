// async function chat(event) {
//     event.preventDefault();

//     const token = localStorage.getItem('token');

//     let groupId = localStorage.getItem('goupId')
//     console.log(groupId)

//     let name = localStorage.getItem('name');
//     const chats = {
//         chats: event.target.chats.value
//     }

//     try {
//         const res = await axios.post(`http://localhost:3000/message/allMsg/${groupId}`,chats, {headers: {"Authorization": token}})
//         if(res.status == 201){
//             console.log(res)
//             // showList(chats)
//             event.target.chats.value = '';

//             saveToLocalStorage(res.data.arr);
//         }
//     } catch (error) {
//         console.log('cannot post message',error)
//     }

// }

// function showChatsOnScreen() {
//     let name = localStorage.getItem('name')
//     let groupId = localStorage.getItem('groupId')

//     let chatArray = localStorage.getItem(`msg${groupId}`)

//     console.log(chatArray)
//     let newChatarray = JSON.parse(chatArray)
//     console.log(newChatarray)

//     let chatContainer = document.querySelector('.chat-container-div')
//     chatContainer.innerHTML = '';

//     newChatarray.forEach(chat => {
//         if(name == chat.name){
//             let child = `<div class= "msg-div" >
//             <div class= "resize-sent">
//                 <div class= "sent" id=${chat.id}>
//                   <p class="sent-name">${chat.name}</p>
//                   <p class="sent-msg">${chat.message}</p>
//                   <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
                
//                   </div>
//             </div>
//          </div>`

//          chatContainer.innerHTML += child;
//         } else {
//             let child = `<div class="msg-div">
//             <div class="resize-received">
//               <div class="received" id=${chat.id}>
//                 <p class="received-name">${chat.name}</p>
//                 <p class="received-msg">${chat.message}</p>
//                 <p class="sent-time">${chat.createdAt.split('T')[1].slice(0,5)}</p>
//               </div>
//             </div>
//           </div>`
//           chatContainer.innerHTML += child

//         }
//     });
// }

// window.addEventListener('DOMContentLoaded',async () => {
//     const token = localStorage.getItem('token');
//     let groupId = localStorage.getItem('groupId')
//     console.log(groupId)

//     let groupName = localStorage.getItem('groupName');
//     let lastId;

//     const messages = JSON.parse(localStorage.getItem('msg')); //converts into obj

//     if(messages == undefined || messages.length == 0){
//       lastId =0;
//     }
//     else{
//       lastId = messages[messages.length-1].id;
//     }

//     try {
//         getMessage(groupId);
//         getUsers(groupId);
//     } catch (error) {
//         console.log('Could not get messages', error)
//     }
// })

// function saveToLocalStorage(arr){
//     let groupId = localStorage.getItem('groupId')
//     console.log(groupId)

//     let chatArray = [];
//     let oldMessages = JSON.parse(localStorage.getItem('msg'))

//     if(oldMessages == undefined || oldMessages.length == 0){
        
//         chatArray = chatArray.concat(arr)

//     } else {
//         chatArray = [];
//         chatArray = chatArray.concat(oldMessages,arr)
//     }

//     console.log(typeof(chatArray))
//     let parseChat = JSON.stringify(chatArray)
//     console.log(typeof(parseChat))

//     localStorage.setItem(`msg${groupId}`, parseChat);
//     console.log(localStorage.getItem(`msg${groupId}`))

//     console.log((JSON.parse(localStorage.getItem(`msg${groupId}`))).length)
//     showChatsOnScreen();
// }

// async function getMessage(groupId){
//     try {
//     const token = localStorage.getItem('token')
//     let groupId = localStorage.getItem('goupId')

//     if (groupId){

//     let lastId;
//     const messages = JSON.parse(localStorage.getItem(`msg${groupId}`))

//     if(messages == undefined || messages.length == 0){
//         lastId = 0;
//     } else{
//         lastId = messages[messages.length - 1].id;
//     }

//         let res = await axios.get(`http://localhost:3000/message/getMsg/${groupId}?msg=${lastId}`,{headers: {'Authorization': token}})
//         console.log(res.data.arr)

//         saveToLocalStorage(res.data.arr)
//     }

//     } catch (error) {
//         console.log(error)
//     }
// }

// async function getUsers(groupId) {
//     const token = localStorage.getItem('token')
//     try {
//     if (groupId){
//         let res = await axios.get(`http://localhost:3000/group/fetchUsers/${groupId}`, {headers: {'Authorization' : token }})
//         console.log(res.data)

//         res.data.forEach( data => addGroupUsersToScreen(data))
//     }
//     } catch (error) {
//         console.log(error)
//     }
// }
// function addGroupUsersToScreen(data) {
//     const userParent = document.getElementById('group')
//     let child = `<div style="width:100%;color:white" class="group-style">
//     <button class="user-btn">${data.name}</button>
//     <button class="add-user" >+</button>
//     <button class="remove-user">-</button>
//     <button class="delete-group">r</button>
//   </div>`
//   userParent.innerHTML += child
// }

const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const userId = localStorage.getItem('userId');

const authAxios = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: token },
  });

  //top-display 

  document.getElementById("login-name").innerHTML = `${name}`;
  const currentGroup = document.getElementById("current-group-name");
  if(localStorage.getItem("groupName") != null) {
    currentGroup.innerHTML = `${localStorage.getItem("groupName")}`
  } else {
    currentGroup.innerHTML = "Select a Group";
  }

  function logout() {
    localStorage.clear();
    window.location.href="./login.html";
  }

 

  

    async function createGroup(event) {
      //event.preventDefault();
      try {
          const name = document.getElementById("create-group-input").value;
      const res = await authAxios.post('/create-group', {name, isAdmin:true});
      //console.log('>>GrouP ID', res.data.group.id);
      const groupId = res.data.group.id;
      localStorage.setItem('groupId', groupId);
  
      }catch (err) {
          console.log(err);
      }
      
    }

    authAxios
  .get("/get-groups")
  .then((res) => {
    //getting groups
    const groupListDiv = document.getElementById("group-list");
    groupListDiv.innerHTML = "";
    res.data.groups.forEach((group) => {
      groupListDiv.innerHTML += `
          <li id="${group.id}" style="padding:5px 0;">
          <span>${group.name}</span>
          <button id="show-users">Show Users</button>
          <button id="change-group-btn" class="group-btn">Enter Chat</button>
          <button id="delete-group-btn" class="group-btn">Delete Group</button>
          </li>
          `;
    });
  })
  .catch((err) => console.log(err));

  

  //get groups


  //chats
  
    //chats
    let localMsg = JSON.parse(localStorage.getItem("localMsg"));
    //console.log(typeof(localMsg))
    let lastId;
    if (localMsg && localMsg.length == 0) {
      //console.log('hiiiiiiiiiiiiiiii')
      lastId = 0;
    }
    if (localMsg && localMsg.length > 0) {
      lastId = localMsg[localMsg.length - 1].id;
    }
    const groupId = localStorage.getItem("groupId");
  
    if (localStorage.getItem("groupId") != null) {
      console.log('***********', lastId)
       //setInterval(() => {
      authAxios
        .get(`/get-chats?id=${lastId}&gId=${groupId}`)
        .then((response) => {
          console.log('*******RESP', response)
        
          let retrivedMsg = localMsg.concat(response.data.chat);

          console.log('all retrrrrrrrr',retrivedMsg)
          //deleting old messages from local storage
          if (retrivedMsg.length > 100) {
            for (let i = 0; i < retrivedMsg.length - 100; i++)
              retrivedMsg.shift();
          }
          localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
  
          const div = document.getElementById("group-chat-receive-box");
          retrivedMsg.forEach((chat) => {
            div.innerHTML += `<div id="${chat.id}>"><span style="color:green;"><b>${chat.name}:</b></span><span>${chat.message}</span></div>`;
          });
        })
        .catch((err) => console.log(err.response));
     //  }, 1000)
    }
  
    function sendGroupMsg(event) {
      event.preventDefault();
  
      if (localStorage.getItem("groupId") == null) {
        alert("Select a group first");
        document.getElementById("group-chat-input").value = "";
      } else {
        const input = document.getElementById("group-chat-input").value;
        const obj = {
          message: input,
          name: name,
          groupId: localStorage.getItem("groupId"),
        };
        console.log(obj);
        authAxios
          .post("/post-chat", obj)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        document.getElementById("group-chat-input").value = "";
        document.getElementById("group-chat-receive-box").innerHTML += `
                  <div><span style="color:green;"><b>${name}:</b></span><span>${input}</span></div>`;
      }
    }
  
    document
    .getElementById("group-list-wrapper")
    .addEventListener("click", (e) => {      //for changing/deleting group

      if (e.target.id === "change-group-btn") {
        const gId= e.target.parentNode.id;
        const gName= e.target.parentNode.children[0].innerText;
        console.log(gId,gName)
        localStorage.setItem("groupId", gId);
        localStorage.setItem("groupName", gName);
        localStorage.setItem("localMsg", "[]");
        window.location.reload();
      }

      if (e.target.id === "delete-group-btn") {
        const gId= e.target.parentNode.id;
        console.log(gId)
        if (confirm("Are you sure?")) {
          authAxios
            .delete(`/delete-group/${gId}`)
            .then((res) => {
              console.log(res.data);
              localStorage.removeItem("groupId");
              alert(`Group with id-${gId} is deleted successfully`);
            })
            .catch((err) => console.log(err.response.data));
        }
      }

      if (e.target.id === "show-users") {
        const gId= e.target.parentNode.id;
        authAxios
          .get(`/get-users/?gId=${gId}`)
          .then((res) => {
            // console.log(res.data);
            document.getElementById("users-inside-group").innerHTML = "";
            res.data.userData.forEach((user) => {
              document.getElementById("users-inside-group").innerHTML += `
                        <li id="${user.groups[0].id}">
                            <span>${user.name}</span>
                            <span>${user.email}</span>
                            <span>${user.groups[0].usergroup.isAdmin}</span>
                            <button id="remove-user-btn" class="user-btn">Remove</button>
                            <button id="make-admin-btn">Make Admin</button>
                        </li> `;
            });
          })
          .catch((err) => console.log(err));
      }

      if (e.target.id === "remove-user-btn") {
        const obj = {
          email: e.target.parentNode.children[1].innerText,
          groupId: e.target.parentNode.id,
        };
        console.log(obj);
        if (confirm("Are you sure?")) {
          authAxios
            .post("/remove-user", obj)
            .then((res) => {
              console.log(res.data);
              alert(`user with ${obj.email} has been removed from the group`);
            })
            .catch((err) => {
              console.log(err.response);
              alert(`user with ${obj.email} not present in the group`);
            });
        }
      }

      if (e.target.id === "make-admin-btn") {
        const obj= {
            email: e.target.parentNode.children[1].innerText,
            groupId: e.target.parentNode.id
        }
        // console.log(obj)
        authAxios
          .post("/make-admin", obj)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });

    //USERS FUNCTIONALITY

    //POSTING USERS
    
    document.getElementById("user-list").addEventListener("click", (e) => {
      //for adding/removing users
      const email = e.target.parentNode.children[1].innerText;
      // console.log(email)
      const isAdmin = e.target.parentNode.children[3].checked;
      //console.log(isAdmin)
  
      if (localStorage.getItem("groupId") == null) {
        return alert("Please select a group first");
      }
      const obj = {
        email: email,
        groupId: localStorage.getItem("groupId"),
        isAdmin: isAdmin,
      };
      // console.log(obj);
      if (e.target.id === "add-user-btn") {
        authAxios
          .post("/add-user", obj)
          .then((res) => {
            console.log(res.data);
            alert(`user with ${email} added to the group`);
          })
          .catch((err) => {
            //console.log(err.response.data);
            alert(`user with ${email} is already a member`);
          });
      }
    });
 
    authAxios
    .get("/get-users")
    .then((res) => {
      // getting users
      // console.log(res.data);
      const userListDiv = document.getElementById("user-list");
      userListDiv.innerHTML = "";
      res.data.user.forEach((user) => {
        userListDiv.innerHTML += `
            <li id='user-${user.id}' class="user-list-inside" style="padding:5px 0;" user-list-li>
            <span>${user.name}</span>
            <span>${user.email}</span>
            <label for="accept">Admin</label>
            <input type="checkbox" id="accept">
            <button id="add-user-btn" class="user-btn">Add</button>
            </li> `;
      });
    })
    .catch((err) => console.log(err.response));


    /* For searching in user list*/
    const searchEl = document.querySelector("[data-search]");
    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        //search bar
        const value = e.target.value.toLowerCase();
        const userList = document.getElementById("user-list");
        const li = userList.getElementsByTagName("li");
        Array.from(li).forEach((user) => {
          const email = user.children[0].textContent;
          const name = user.children[1].textContent;
          if (
            (email.toLowerCase().indexOf(value) !== -1) ||
            (name.toLowerCase().indexOf(value) !== -1)
          ) {
            user.style.display = "block";
          } else {
            user.style.display = "none";
          }
        });
      });
    }