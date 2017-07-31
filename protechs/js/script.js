var popup=document.querySelector(".popup");
var popupClose=document.querySelector(".popup__close");
var popupCheck=document.querySelector(".popup__input");

var feedback=document.querySelector(".feedback");
var feedbackOpen=document.querySelector(".open-feedback");
var feedbackClose=document.querySelector(".feedback__close");

if (popup) {
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
}

if (feedback) {
    feedbackOpen.addEventListener("click", function(event){
        event.preventDefault();
        feedback.classList.add("feedback--visible");
    });

    feedbackClose.addEventListener("click", function(event){
        event.preventDefault();
        feedback.classList.remove("feedback--visible");
    });
}