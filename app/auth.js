/* ------------------------------Redirection/hero-CTA to index.html-------------------------------------------- */
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("hero-CTA")){
        window.location.href='./Authentication-app/login.html';
    }
});
/* -------------------------------------------------------------------------- */


/**
 * Relative Path (Relative Path): 'auth/index.html' => browser looks for the auth folder inside the current directory (this breaks)

 * Root Relative Path (Absolute Path): '/auth/index.html' => The leading slash / tells the browser to start looking from the root domain of your 
                                                            website (e.g., https://example.com), regardless of which page the user is currently visiting.(doesn't breaks)
                                                            =>Use the absolute path /auth/login.html. It ensures your redirect functions correctly from any deep-nested 
                                                            subfolder or page layout across your entire website.


->window.location.assign('auth/login.html');: Does the exact same thing as .href. It adds the new page to the browser history, 
allowing the user to click the "Back" button.
->window.location.replace('auth/login.html');: Redirects the user but removes the current page from the session history. 
The user will not be able to click the "Back" button to return to the protected page. This is usually preferred for login and logout redirects.
 */