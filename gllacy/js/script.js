//Карта начало
ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        center: [59.93931499, 30.32940030],
        zoom: 16
    }, {
        searchControlProvider: "yandex#search"
    }),
    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        hintContent: "Магазин Глейси"
    }, {
        cursor: "arrow",
        iconLayout: "default#image",
        iconImageHref: "img/map_placemark.png",
        iconImageSize: [218, 142],
        iconImageOffset: [-40,-139],
        hasBalloon: false
    });
    myMap.geoObjects.add(myPlacemark);
});
//Карта конец

var feedbackOpen = document.querySelector("#feedbackOpen");
var feedback = document.querySelector("#feedback");
var feedbackClose = document.querySelector("#feedbackClose");

if (feedback) {
    var feedbackName = feedback.querySelector("#feedbackName");
    var feedbackEmail = feedback.querySelector("#feedbackEmail");
    var feedbackMessage = feedback.querySelector("#feedbackMessage");
    var feedbackSubmit = feedback.querySelector("#feedbackSubmit");

    feedbackOpen.addEventListener("click", function(event){
        event.preventDefault();
        feedback.classList.add("feedbackShow");
    });

    feedbackSubmit.addEventListener("click", function(event){
        if (!(feedbackName.value && feedbackEmail.value && feedbackMessage.value)){
            event.preventDefault();
            alert("Пожалуйста, заполните все поля");    
        }
    });

    feedbackClose.addEventListener("click", function(event){
        event.preventDefault();
        feedback.classList.remove("feedbackShow");
    });
};

window.addEventListener("keydown", function(event){
    if (event.keyCode == 27) {
        feedback.classList.remove("feedbackShow");
    }
});
