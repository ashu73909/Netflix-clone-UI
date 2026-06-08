//previousElementSibling: A read-only DOM property that looks at the same HTML level and selects the element directly before the target
document.addEventListener('click',(e)=>{
    const hide=e.target.classList.contains("eye");
    if(!hide)return;
    const input=e.target.previousElementSibling;
    if(input.type==="password"){
        input.type="text";
    }else{
        input.type="password";
    }
});