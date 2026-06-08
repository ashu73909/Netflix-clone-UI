//profile.js inside app then ./api.js and if profile.js is outside app then /app/api.js
import {getProfileData} from "./api.js";



//reference
const msgCont=document.getElementById("msgcont");
const userName=document.getElementById("username");
const userEmail=document.getElementById("email");
const userRole=document.getElementById("role");
const member=document.getElementById("joined");

//loading reference
const loader=document.getElementById("loading");

//msg creation 
const message =document.createElement("div");

//protected profile page => if token doesn't exist that means  registeration did not happened then , redirect to index.html.
//check if JWT token is in Local stg or not ,if not that means no registration or logout happened , .: user can't directly navigate to  profile just my changing things in url 
const auth_Token=localStorage.getItem("accessToken");
if(!auth_Token){//if their is no token , 100% user is in login or regiter page and , and profile pages are protected ,without token their is no profile access.
    window.location.href="login.html";

}else{//when their is token => which is only available when loginned and redirected to profile page. 

    //rendering data
    const recvData=await getProfileData();
    
    //Since getProfileData().ok => returns a promise so we use recvData.success => true/false
    if(recvData.success){
        //message rendering
        message.textContent="*"+recvData.message;
        message.classList.add("green");
        msgCont.append(message);

        //user name data
        const nameData=document.createElement("div");
        nameData.textContent=recvData.data.username;
        nameData.classList.add("text");
        userName.append(nameData);

        //user email
        const EMAIL=document.createElement("div");
        EMAIL.textContent=recvData.data.email;
        EMAIL.classList.add("text");
        userEmail.append(EMAIL);

        //user role
        const ROLE=document.createElement("div");
        ROLE.textContent=recvData.data.role;
        ROLE.classList.add("text");
        userRole.append(ROLE);

        //member since
        const MEMBER=document.createElement("div");
        const joinedDate=recvData.data.createdAt;
        const dateObj = new Date(joinedDate);
        MEMBER.textContent=dateObj;
        MEMBER.classList.add("text");
        member.append(MEMBER);
    }else{
        message.textContent="*"+recvData.message;
        message.classList.add("red");
        msgCont.append(message)
    }
}

//converted data to obj from json
// const recvData=await getProfileData().json();
// console.log(recvData);


/* -----------------------------------Logout endpoint--------------------------------------- */
/* 
Click Logout
      ↓
POST /logout => Logout-API
      ↓
Backend invalidates session/token
      ↓
Frontend removes token from localStorage [done when logout button clicked]
      ↓
Redirect Login

Backend logout->Invalidates server-side auth->Frontend logout->Removes token from browser
-> localstorage.removeItem() only removes token from browser/frontend local storage : the user is logged out locally, but the backend never receives a logout request.
*/


//Logout API :- ye API post hone pr automatically backend me jakr token/session ko invalidate kr deti hai .
//localStorage -> accessToken : this gives location  to backend about user logout credentials, so we have to first invalidate in backend then later remove token from frontend  

const logOutButton=document.querySelector(".LO-btn");
//logout redirection 
logOutButton.addEventListener('click',async ()=>{

    //since we use loaders for promise so we have to wrap promise inside loader
    //loader on promise start
    loader.classList.remove("hidden");

    //backend logout request=>  backend invalidates session/token 
    const localToken=localStorage.getItem("accessToken");
    const response=await fetch('https://api.freeapi.app/api/v1/users/logout',{
        method:'POST',
        headers:{
            Authorization: `Bearer ${localToken}`//invalidates user token/session
        }
    });
    const data=await response.json();
    console.log(data);
    //loader on promise ends
    loader.classList.add("hidden");

    //after server side invalidates session/cookie/token , remove token from local and redirect to login. 
    if(response.ok){
        message.textContent="*"+data.message;
        message.classList.add("green");
        msgCont.append(message);
        setTimeout(()=>{
            //since token is still after logout , so we have to manually remove token that came for currentUser API,before going to login page ..we'll use Logout API endpoint to make sure server backend recieves a logout request and invalidates seesion/token.
            localStorage.removeItem("accessToken");
            window.location.href="login.html";
        },3000);
    }else{
        message.textContent="*"+data.message;
        message.classList.add("red");
        msgCont.append(message);
    }
});


/* ----------------------------------redirection to movie recommnendation app ---------------------------------------- */
