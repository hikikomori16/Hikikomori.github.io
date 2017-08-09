//header
var search_switch = document.querySelector(".header__search-switch");
var menu1lvl_open = document.querySelector(".header__menu-open");
var menu1lvl_close = document.querySelector(".header__menu-close");
var menu2lvl_open = document.querySelector(".header__menu-item-link-2lvl");
var menu2lvl_close = document.querySelector(".header__menu-2lvl-close");

var search = document.querySelector(".header__search");
var menu1lvl = document.querySelector(".header__menu-1lvl");
var menu2lvl = document.querySelector(".header__menu-2lvl");

search_switch.addEventListener("click", function(event){
  event.preventDefault();
  if(this.classList.contains("header__search-switch--close")&&search.classList.contains("header__search--opened")){
    this.classList.remove("header__search-switch--close");
    search.classList.remove("header__search--opened");
  }

  else{
    this.classList.add("header__search-switch--close");
    search.classList.add("header__search--opened");
  }
});

window.addEventListener("keydown", function(event){
  if(event.keyCode == 27) {
    search_switch.classList.remove("header__search-switch--close");
    search.classList.remove("header__search--opened");
  }
});

menu1lvl_open.addEventListener("click", function(event){
  event.preventDefault();
  menu1lvl.classList.add("header__menu--opened");
});

menu2lvl_open.addEventListener("click", function(event){
  event.preventDefault();
  menu2lvl.classList.add("header__menu--opened");
});

menu1lvl_close.addEventListener("click", function(event){
  event.preventDefault();
  menu1lvl.classList.remove("header__menu--opened");
});

menu2lvl_close.addEventListener("click", function(event){
  event.preventDefault();
  menu2lvl.classList.remove("header__menu--opened");
});

//tabs-mobile-tablet
var prev_tab = document.querySelector(".tabs__controller-button--prev");
var next_tab = document.querySelector(".tabs__controller-button--next");
var tab__caption_material = document.querySelector(".tabs__caption--material");
var tab__caption_end_product = document.querySelector(".tabs__caption--end-product");
var tab__caption_technology = document.querySelector(".tabs__caption--technology");
var tab__content_material = document.querySelector(".tabs__content--material");
var tab__content_end_product = document.querySelector(".tabs__content--end-product");
var tab__content_technology = document.querySelector(".tabs__content--technology");

next_tab.addEventListener("click", function(event){
  var tab__caption = document.querySelector(".tabs__caption--selected");
  var tab__content = document.querySelector(".tabs__content--selected");
  event.preventDefault();
  if(tab__caption.classList.contains("tabs__caption--material")&&tab__content.classList.contains("tabs__content--material")){
    tab__caption_material.classList.remove("tabs__caption--selected");
    tab__content_material.classList.remove("tabs__content--selected");
    tab__caption_end_product.classList.add("tabs__caption--selected");
    tab__content_end_product.classList.add("tabs__content--selected");
    prev_tab.classList.remove("tabs__controller-button--disabled");
  }

  else if(tab__caption.classList.contains("tabs__caption--end-product")&&tab__content.classList.contains("tabs__content--end-product")){
    tab__caption_end_product.classList.remove("tabs__caption--selected");
    tab__content_end_product.classList.remove("tabs__content--selected");
    tab__caption_technology.classList.add("tabs__caption--selected");
    tab__content_technology.classList.add("tabs__content--selected");
    this.classList.add("tabs__controller-button--disabled");
  }
});

prev_tab.addEventListener("click", function(event){
  var tab__caption = document.querySelector(".tabs__caption--selected");
  var tab__content = document.querySelector(".tabs__content--selected");
  event.preventDefault();
  if(tab__caption.classList.contains("tabs__caption--technology")&&tab__content.classList.contains("tabs__content--technology")){
    tab__caption_technology.classList.remove("tabs__caption--selected");
    tab__content_technology.classList.remove("tabs__content--selected");
    tab__caption_end_product.classList.add("tabs__caption--selected");
    tab__content_end_product.classList.add("tabs__content--selected");
    next_tab.classList.remove("tabs__controller-button--disabled");
  }

  else if(tab__caption.classList.contains("tabs__caption--end-product")&&tab__content.classList.contains("tabs__content--end-product")){
    tab__caption_end_product.classList.remove("tabs__caption--selected");
    tab__content_end_product.classList.remove("tabs__content--selected");
    tab__caption_material.classList.add("tabs__caption--selected");
    tab__content_material.classList.add("tabs__content--selected");
    this.classList.add("tabs__controller-button--disabled");
  }
});

//tabs-desktop
var tabs = document.querySelector(".tabs");
var tab_captions = document.querySelectorAll(".tabs__caption");
var tab_contents = document.querySelectorAll(".tabs__content");
var caption_name = null;

for (i=0; i< tab_captions.length; i++) {
  tab_captions[i].addEventListener("click", function(event){
    event.preventDefault();
    if(this.classList.contains("tabs__caption--selected")){}

    else{

      if(this.classList.contains("tabs__caption--material")){
        caption_name = "material"
      }

      else if(this.classList.contains("tabs__caption--end-product")){
        caption_name = "end-product"
      }

      else if(this.classList.contains("tabs__caption--technology")){
        caption_name = "technology"
      }

      else{}

      for (i=0; i< tab_captions.length; i++) {
        tab_captions[i].classList.remove("tabs__caption--selected")
      };

      for (i=0; i< tab_captions.length; i++) {
        tab_contents[i].classList.remove("tabs__content--selected")
      };

      tabs.classList.remove("tabs--material");
      tabs.classList.remove("tabs--end-product");
      tabs.classList.remove("tabs--technology");

      var caption = document.querySelector(".tabs__caption--"+caption_name);
      var content = document.querySelector(".tabs__content--"+caption_name);

      caption.classList.add("tabs__caption--selected");
      content.classList.add("tabs__content--selected");
      tabs.classList.add("tabs--"+caption_name);
    }
  });
};



