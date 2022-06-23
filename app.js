class App{
    constructor(){
        this.notes=[];
        
        this.$form=document.querySelector("#form");
        this.$noteTitle=document.querySelector("#note-title");
        this.$noteText=document.querySelector("#note-text");
        this.$formButtons=document.querySelector("#form-buttons");
        
        this.addEventListenders();
    }

    addEventListenders(){
        document.body.addEventListener("click", e =>{
            this.handleFormClick(e);
        });

        this.$form.addEventListener("submit",e=>{
            e.preventDefault();
            const title= this.$noteTitle.value;
            const text= this.$noteText.value;
            const hasNote= title || text;

            if (hasNote) {
              this.addNote({title , text})
            }
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

    addNote(note){
        const newNote={
        title:note.title,
        text:note.text, 
        color:"white",
        id:this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes=[...this.notes,newNote]
        console.log(this.notes);
    }  
}

new App();