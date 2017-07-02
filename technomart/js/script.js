var lostButton = document.querySelector(".aboutCompanyLost");
var feedbackWindow = document.querySelector(".feedbackWindow");
var buyButton = document.querySelectorAll(".itemOverlayBuy");
var bookmarkButton = document.querySelectorAll(".itemOverlayBookmark");
var itemAdded = document.querySelector(".itemAdded");
var modalWindow = document.querySelectorAll(".modalWindow");
var closeWindowBtns = document.querySelectorAll(".jsCloseWindow");
var bookmarksLink = document.querySelector(".bookmarks")
var cartLink = document.querySelector(".cart")
var bookmarks = document.querySelector(".bookmarks span")
var cart = document.querySelector(".cart span")
var bookmarksValue = parseInt(bookmarks.textContent);
var cartValue = parseInt(cart.textContent);
var services = document.querySelector(".services");
var showMap = document.querySelector("#showMap");
var map = document.querySelector(".modalMapHover");
var closeMap = document.querySelector("#closeMap");

if (feedbackWindow) {
    var pData = feedbackWindow.querySelector("#name");
    var email = feedbackWindow.querySelector("#email");
    var text = feedbackWindow.querySelector("#text");
    var submit = feedbackWindow.querySelector(".buttonGo");

    lostButton.addEventListener("click", function(event){
        event.preventDefault();
        feedbackWindow.classList.add("modalWindowShow");
    });

    submit.addEventListener("click", function(event){
        if (!(pData.value && email.value && text.value)){
            event.preventDefault();
            alert("Пожалуйста, заполните все поля");    
        }
    });
};

if (services) {
    var servicesSliderButtons = services.querySelectorAll(".servicesSliderButtons a");
    var deliveryButton = services.querySelector("#delivery");
    var guaranteeButton = services.querySelector("#guarantee");
    var creditButton = services.querySelector("#credit");
    var delivery = services.querySelector(".delivery");
    var guarantee = services.querySelector(".guarantee");
    var credit = services.querySelector(".credit");

    deliveryButton.addEventListener("click", function(event){
        event.preventDefault();

        for (i=0; i< servicesSliderButtons.length; i++) {
            servicesSliderButtons[i].classList.remove("current")
        };

        deliveryButton.classList.add("current");

        credit.classList.remove("servicesSliderShow");
        guarantee.classList.remove("servicesSliderShow");
        delivery.classList.add("servicesSliderShow");
    });

    guaranteeButton.addEventListener("click", function(event){
        event.preventDefault();

        for (i=0; i< servicesSliderButtons.length; i++) {
            servicesSliderButtons[i].classList.remove("current")
        };

        guaranteeButton.classList.add("current");

        delivery.classList.remove("servicesSliderShow");
        credit.classList.remove("servicesSliderShow");
        guarantee.classList.add("servicesSliderShow");
    });

    creditButton.addEventListener("click", function(event){
        event.preventDefault();

        for (i=0; i< servicesSliderButtons.length; i++) {
            servicesSliderButtons[i].classList.remove("current")
        };

        creditButton.classList.add("current");

        delivery.classList.remove("servicesSliderShow");
        guarantee.classList.remove("servicesSliderShow");
        credit.classList.add("servicesSliderShow");
    });
};

if (map) {
    function closeMapFunc(event) {
        event.preventDefault();
        map.classList.remove("showMap")
    };

    showMap.addEventListener("click", function(event){
        event.preventDefault();
        map.classList.add("showMap");
    });

    closeMap.addEventListener("click", closeMapFunc);

};

function closeWindow(event) {
    event.preventDefault();
    for (i=0; i< modalWindow.length; i++) {
        modalWindow[i].classList.remove("modalWindowShow");
    }
};

function incrBookmarks() {
    if (bookmarksValue == 0) {
        bookmarksLink.classList.add("incr");
        bookmarks.innerHTML = ++bookmarksValue;
    } else {  
        bookmarks.innerHTML = ++bookmarksValue;
    }
}

function incrCart() {
    if (cartValue == 0) {
        cartLink.classList.add("incr");
        cart.innerHTML = ++cartValue;
    } else {
        cart.innerHTML = ++cartValue;
    }
};

for (i=0; i< buyButton.length; i++) {
    buyButton[i].addEventListener("click", function(event){
        event.preventDefault();
        incrCart();
        itemAdded.classList.add("modalWindowShow");
    });
}

for (i=0; i< bookmarkButton.length; i++) {
    bookmarkButton[i].addEventListener("click", function(event){
        event.preventDefault();
        incrBookmarks();
    });
}

for (i=0; i< closeWindowBtns.length; i++) {
    closeWindowBtns[i].addEventListener("click", closeWindow);
}

window.addEventListener("keydown", function(event){
    if (event.keyCode == 27) {
        closeWindow(event);
    }
});
