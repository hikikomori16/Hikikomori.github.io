var siteLink = document.querySelectorAll(".site-preview__link");
var popup = document.querySelectorAll(".site-about")
var closePopup = document.querySelectorAll(".site-about__content-close")

for (i=0; i< siteLink.length; i++) {
  siteLink[i].addEventListener("click", function(event){
    event.preventDefault();
    var siteId = this.getAttribute("data-id");
    var siteNameId = "site-about-" + siteId;
    document.querySelector("." + siteNameId).classList.add("site-about--visible");
  });
}

for (i=0; i< closePopup.length; i++) {
  closePopup[i].addEventListener("click", function(event){
    event.preventDefault();
    for (i=0; i< popup.length; i++) {
        popup[i].classList.remove("site-about--visible");
    }
  });
}


