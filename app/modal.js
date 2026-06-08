/* -------------------------------this logic is for Modal cards------------------------------------------- */
document.addEventListener("click",(e)=>{

    const btn = e.target.closest(".movie-btn");//exactly navigated to the btn that triggered event
    if(!btn) return;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.innerHTML = `
        <div class="modal-card">
            <img src="assets/hero-background.webp">
            <div class="modal-content">
                <h1>Smallville</h1>
                <span>
                    Kansas teen Clark Kent discovers his powers...
                </span>
                <button class="play-btn">
                    Play Trailer
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
});
//to remove modal
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("overlay")){
        e.target.remove();
    }    
});
/* -------------------------------------------------------------------------- */