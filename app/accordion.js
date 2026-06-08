/* ---------------------------FAQ/Accordion----------------------------------------------- */
//for accordion FAQ section ,when click each faq
document.addEventListener('click',(e)=>{
    const FAQ=e.target.closest(".faqs");//here we reached the element that triggered event.
    if(!FAQ) return;

    //for span + rotation animation 2.
    const plus=FAQ.querySelector(".opr");
    plus.classList.toggle("span-rotate");

    //for faq-answer 1.
    const faqItem=FAQ.closest(".faq-item");//.closest(".") finds closest ancester element with given selector.
    const faqAnswer=faqItem.querySelector(".faqs-answer");
    faqAnswer.classList.toggle("active");
});

/* -------------------------------------------------------------------------- */