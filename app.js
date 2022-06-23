class App{
    constructor(){
        this.$form=document.querySelector("#form");
        this.$noteTitle=document.querySelector("#note-title");
        this.$formButtons=document.querySelector("#form-buttons");
        this.addEventListenders();
    }

    addEventListenders(){
        document.body.addEventListener("click", e =>{
            this.handleFormClick(e);
        });
    }

    handleFormClick(e){
       const isFormClicked= this.$form.contains(e.target);

       if(isFormClicked){
        this.openForm();
       } else{
        this.closeForm();
       }
    }
    openForm(){
        this.$form.classList.add("form-open");
        this.$noteTitle.style.display="block";
        this.$formButtons.style.display="block";
    }

    closeForm(){
        this.$form.classList.remove("form-open");
        this.$noteTitle.style.display = "none";
        this.$formButtons.style.display = "none";
    }
}

new App();