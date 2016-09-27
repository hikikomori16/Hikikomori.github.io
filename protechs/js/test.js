var jake = document.querySelectorAll(".jake");

for (i=0; i< jake.length; i++) {
    jake[i].addEventListener("click", function(event){
        event.preventDefault();
        for (i=0; i< jake.length; i++) {
            jake[i].classList.remove("jakethedog")
        };
        this.classList.add("jakethedog")
    });
}
