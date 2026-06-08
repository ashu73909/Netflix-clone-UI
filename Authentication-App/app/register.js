//Phase1: ye API registeration ke liye bni hai ,jb user credentials dal ke button click krta hai or on posting data through this API ,it automatically saves data in backend(because it is written like that)

//API :- POST https://api.freeapi.app/api/v1/users/register 
/**API DOES : designed in such a way that it stores valid data in backend. 
Frontend
    ↓
Sends new user data
    ↓
Backend
    ↓
Stores user in database

Example: gets saved in backend 
ashu
ashu@gmail.com
Ashu686
ADMIN
 */

//HTTP 422 means Frontend sent request successfully but backned rejected data
//HTTP 200 means success 
//409 for duplicate data
//204 no content => in data obj--> json data
//401 the server blocked your request because you are not logged in, your session expired, or your login credentials (like a username, password, or API token) were rejected



//register button reference
const button=document.getElementById("btn");
//message box
const msgBox=document.getElementById("message-box");

/**
Click Register
    ↓
Read username.value
Read email.value
Read password.value
Read role.value
    ↓
Create data object
    ↓
console.log(data)
    ↓
fetch(...)
    ↓
reponse.json() /took data from backend 
    ↓
created msg box
    ↓
if(response.ok)=>checks statusCode: 200  in API
    ↓
creates msg box and redirects to login page after 3s
    ↓
else(reponse not ok )/409,422,204
    ↓
creates msg box saying recvData.message , *Note: "message": is already in API /or backend.
    ↓
append msg box on html
 */



//getting references of inputs 
const userName=document.getElementById("user-name");
const EMAIL =document.getElementById("email-id");
const userPassword=document.getElementById("user-pass");
const userRole=document.getElementById("dropdown");
const confirmPass=document.getElementById("re-pass");
//loading references
const loader=document.getElementById("loading");

button.addEventListener('click',async (e)=>{
    e.preventDefault();
    msgBox.innerHTML="";
    //creates message Box in register.html 
    const messageBox=document.createElement("div");
    
    //Frontend validation for username uppercase and password mismatch
    if(/[A-Z]/.test(userName.value)){
        messageBox.innerHTML=`*required username lowercase`;
        messageBox.classList.add("red");
        msgBox.append(messageBox);
        return;
    }else{
    }
    if(confirmPass.value!==userPassword.value ){
        messageBox.classList.add("red")
        messageBox.textContent=`*incorrect password / mismatch`;
        msgBox.append(messageBox);
        return;
    }

    //getting data from input after button click and then POSTing it 
    const data={
        "email": EMAIL.value,
        "password":userPassword.value,
        "role": userRole.value,
        "username": userName.value
    }

    //loader on promise start 
    loader.classList.remove("hidden");

    //on every click gives message and deletes previous one 

    //Sending data to backend through API 
    const response=await fetch('https://api.freeapi.app/api/v1/users/register',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)//converts object to json data, and something.json() converts
    });

    //recieving backend data, that is posted by API
    const recvData=await response.json();

    //loader on promise ends 
    loader.classList.add("hidden");

    //response.ok => checks statusCode:200-299 for true and others for false  
    if(response.ok){
        messageBox.classList.add("green")
        messageBox.textContent="*"+recvData.message;
        setTimeout(()=>{
            window.location.href="login.html";
        },3000);
    }else{
        messageBox.classList.add("red");
        messageBox.textContent="*"+recvData.message;
    }
    msgBox.append(messageBox);
});
