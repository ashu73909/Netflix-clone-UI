
//Phase 2: ye api login ke liye bani hai ,so on posting it ,it automatically verifies username/password ,then creates session and returns failure/success

//API :-POST https://api.freeapi.app/api/v1/users/login
//Login does NOT return user data only.It also creates an authenticated session.
//Later when we call GET /current-user in profile , the backend already knows "Oh, this browser already logged in" =>because of that session/cookie created during login.

/**Login API does : designed in such a way that it verifies valid login credentials from backend without frontend manual logic to verify.
Frontend
    ↓
Sends username + password
    ↓
Backend
    ↓
Checks database
Does username exist?
Does password match?
    ↓
verify Account / session created  => add credentials :include in fetch methods=>cookie and session
    ↓
session used by profile
 */


//404 statusCode :-the server cannot locate the webpage you are trying to reach

//event reference/button reference 
const LogButton=document.getElementById("btn");


//user inputs
const userName=document.getElementById("user-inp");
const userPassword=document.getElementById("user-pas");
//message cont reference
const msgCont=document.getElementById("msgcont");

//Loading
const loader=document.getElementById("loading");

//event listener 
LogButton.addEventListener('click',async (e)=>{
    e.preventDefault();

    //before new message container is created delete previous one 
    msgCont.innerHTML="";

    //message creation
    const msgBox=document.createElement("div");

    //data from user input
    //.value of all input refernces are are readed after click here and their reference is taken outside
    const data={
        "password": userPassword.value,
        "username": userName.value
    }
    console.log(data);//debugging steps 

    //loader on promise start 
    loader.classList.remove("hidden");

    //to post data ,create verifying session 
    const response=await fetch('https://api.freeapi.app/api/v1/users/login',{
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        //credentials:"include",
        body:JSON.stringify(data)
    });
    //getting response stored in recvData
    const recvData=await response.json();

    //loader => hide loader after promise satisfies or ends
    loader.classList.add("hidden");

    //validation
    if(response.ok){//200-299 => success:true or 300-422 or other => error => success:false
        msgBox.textContent="*"+recvData.message;
        msgBox.classList.add("green");
        msgCont.append(msgBox);

        //localStorage
        localStorage.setItem(
            "accessToken",
            recvData.data.accessToken
        );

        //if login successfully or verification completed 
        setTimeout(()=>{
          window.location.href="profile.html";
        },3000);
    }else{
        msgBox.textContent="*"+recvData.message;
        msgBox.classList.add("red");
        msgCont.append(msgBox);
    }
});


//for cookie/session authentication, the browser often needs:
/**credentials: "include" in login.js and same for profile.js page cause it accesses data from session/cookie.
*"If the server sends a cookie,
    store it.
*If I already have a cookie,
    send it."
Login
    ↓
Backend creates session cookie
    ↓
Browser stores cookie
    ↓
current-user request
    ↓
Cookie sent back
    ↓
Backend recognizes user
 */


///But here we are doing  token based local storage of data in browser so when profile is visited using token we go to browsers local stg and then backend sends data 

/**Learned
User enters credentials
        ↓
Create payload
        ↓
POST /login
        ↓
Backend verifies username/password
        ↓
Creates session/cookie
        ↓
Returns success
        ↓
Redirect profile
 */

//The frontend should not have access to the database, so it cannot manually verify:
/**
if(username === "jeetu" && password === "jjj0321")
=>That would be insecure and impossible at scale.
frontend only responsibility is to :-
Collect inputs
    ↓
Send API request
    ↓
Show success/error message
    ↓
Redirect user

Backend responsibility(register API for that)
Verify credentials
Check duplicates
Hash passwords
Create sessions
Authorize users
Return user data
 */



/*
=>Traditional Session + Cookie Authentication
Login
  ↓
Username + Password
  ↓
Backend verifies
  ↓
Backend creates Session
  ↓
Session ID stored in database/cookie
  ↓
Cookie sent to browser

->Browser stores session/cookie id that came from database as : abc123 format
->Then every request:
Browser
  ↓
Cookie: sessionId=abc123
  ↓
Backend
  ↓
Looks up session in database
  ↓
Finds user


=>Token (JWT) Authentication
->Login:
Username + Password
  ↓
Backend verifies
  ↓
Backend creates Token :eyJhbGciOiJIUzI1Ni...

->Backend sends:
{
  "accessToken":"..." //this token we get when we Login(post api for login) ,backend verifies and sends token in response 
}
and we store it in our browser local stg by:
localStorage.setItem(
  "accessToken",
  token
);

=>Now Browser now has: acessToken:eyJhbGc..
So When visiting profile:
Frontend
  ↓
Gets token from localStorage
  ↓
Authorization: Bearer eyJhbGc...
  ↓
Backend
->Backend verifies token signature and says:Yes, this token belongs to xyz username and sends user data.


=>What is inside a JWT?
->Your token actually contains data.
accessToken:eyJhbGc.. if decoded :-
{
    "_id":"6a21fa...",
    "email":"jeetu@gmail.com",
    "username":"jeetu",
    "role":"USER"
    "iat": 1780616846,//timestamp
    "exp": 1780703246//timestamp
}


 */