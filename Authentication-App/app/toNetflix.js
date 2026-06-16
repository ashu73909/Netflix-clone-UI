const loader=document.getElementById("loading");
document.addEventListener('click',(e)=>{
    const button=e.target.classList.contains("movie-site");
    if(!button) return;
    loader.classList.remove("hidden");
    //refers back to the index page 
    window.location.href="../../index.html";
    loader.classList.add("hidden");
});