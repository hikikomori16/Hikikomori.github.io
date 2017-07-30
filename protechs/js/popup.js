var popup=document.querySelector(".popup");
var popupClose=document.querySelector(".popup__close");
var popupCheck=document.querySelector(".popup__input");

$("#popup__text").load("action.txt",function() {
    if ($("#popup__text").html() && !localStorage.getItem("popupNoShow")) {
        popup.classList.add("popup--visible");
    }
});

popupClose.addEventListener("click", function(event){
    event.preventDefault();
    if(popupCheck.checked){
        localStorage.setItem("popupNoShow",true);
    }
    popup.classList.remove("popup--visible");
});