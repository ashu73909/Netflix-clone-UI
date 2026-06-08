//API:-
//Profile api => This api automatically fetches Loginned user data from backend,
//get current user data
export async function getProfileData() {
    const token=localStorage.getItem("accessToken");
    const response=await fetch('https://api.freeapi.app/api/v1/users/current-user',{
        method:'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return await response.json();
}
/*JWT token 
after login backend creates token in server and sends accessToken through response to frontend and then on success login we store that token in localStorage
          ↓
    Profile request(login button)
          ↓
accessToken stored in localStorage
          ↓
Frontend reads token
          ↓
Adds token to Authorization header
          ↓
GET /current-user
          ↓
Backend verifies token
          ↓
Backend identifies user
          ↓
Backend sends profile data

->accessToken = Proof of Identity
*/