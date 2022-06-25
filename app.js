class App{
    constructor(){
        this.notes=[];
        this.title="";
        this.text="";
        this.id="";
        
        this.$placeholder=document.querySelector("#placeholder");
        this.$form=document.querySelector("#form");
        this.$notes=document.querySelector("#notes");
        this.$noteTitle=document.querySelector("#note-title");
        this.$noteText=document.querySelector("#note-text");
        this.$formButtons=document.querySelector("#form-buttons");
        this.$formCloseButton=document.querySelector("#form-close-button");
        this.$modal=document.querySelector(".modal");
        this.$modalTitle=document.querySelector(".modal-title");
        this.$modalText=document.querySelector(".modal-text");
        
        this.addEventListenders();
    }

    addEventListenders(){
        document.body.addEventListener("click", e =>{
            this.handleFormClick(e);
            this.selectNote(e);
            this.openModal(e);
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
        this.$formCloseButton.addEventListener("click", e=>{
            e.stopPropagation();
            this.closeForm();
        })

    }

    handleFormClick(e){
        
       const isFormClicked= this.$form.contains(e.target);

       const title = this.$noteTitle.value;
       const text = this.$noteText.value;
       const hasNote = title || text;

       if(isFormClicked){
        this.openForm();
       } else if (hasNote){
        this.addNote({title,text});
       }else{
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
        this.$noteTitle.value="";
        this.$noteText.value="";
    }
    openModal(e){
        if(e.target.closest(".note")){
            this.$modal.classList.toggle("open-modal")
            this.$modalTitle.value=this.title;
            this.$modalText.value=this.text;
        }
    }

    addNote({title,text}){
        const newNote={
        title,
        text, 
        color:"white",
        id:this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes=[...this.notes,newNote]
        this.displayNotes();
        this.closeForm();
    }  

    selectNote(e){
        const $selectedNote=e.target.closest(".note")
        if(!$selectedNote) return;
        const [$noteTitle,$noteText]=$selectedNote.children;
        this.title=$noteTitle.innerText;
        this.text=$noteText.innerText;
        this.id=$selectedNote.dataset.id;
    }

    displayNotes(){
        const hasNotes= this.notes.length > 0
        this.$placeholder.style.display=hasNotes ? "none" : "flex";

        this.$notes.innerHTML=this.notes.map(
          (note) => `
            <div style="background: ${note.color}" class="note" data-id="${note.id}">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="/">
                        <img class="toolbar-delete" src="/">
                    </div>
                </div>
            </div>
        `).join("");
        
    }
}

new App();