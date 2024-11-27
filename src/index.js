import { el } from "date-fns/locale";
import "./styles.css";
import { format, isToday, toDate, parse, isBefore } from "date-fns";
import plusImage from "./images/plus.svg"; 
import deleteImage from "./images/delete.svg"; 
import pencilImage from "./images/pencil-outline.svg"; 
import checkImage from "./images/check.svg"; 
import closeImage from "./images/close.svg"
import saveImage from "./images/save.svg"


function projectModule(){
    
    const listOfProjects = [
        {
            "name": "Today",
            toDos: []
        }
        ,        
    ]

    // I was going to implement a sort function but decided against it at this stage, I will revisit this in the future!
    // function sortToDoPriority(projectIndex){

    //     let project = {
    //         name: listOfProjects[projectIndex].name,
    //         toDos: listOfProjects[projectIndex].toDos.sort((a, b) => a.priority - b.priority)
    //     }
    //     projectByPriority = project

    //    console.log(projectByPriority)

    // }    


    // let priorityToggle = 0

    // let projectByPriority = 0

    // function togglePriority(){
    //     if (priorityToggle === 0){
    //         priorityToggle = 1
    //     } else if (priorityToggle === 1)
    //     {priorityToggle = 0}
    // }

    function createProject(name){
        let project = {
            name: name,
            toDos: []
        }
        listOfProjects.push(project)
    } 

    function renameProject(projectIndex, name){
        listOfProjects[projectIndex].name = name
    }

    function removeProject(projectIndex){
        listOfProjects.splice(projectIndex, 1)
        console.log(listOfProjects)
    }

    function switchProject(projectIndex, newProjectIndex, toDoIndex){
        project.listOfProjects[newProjectIndex].toDos.push(project.listOfProjects[projectIndex].toDos[toDoIndex])
        project.listOfProjects[projectIndex].toDos.splice(toDoIndex, 1)
        console.log(project.listOfProjects)
    }

    return {listOfProjects, createProject, renameProject, removeProject, switchProject }

}

function toDoModule(){
    
    function createToDo (name, description, priority, status, date, projectIndex){

        let toDo = {
            name: name,
            description: description,
            priority: priority,
            status: status,
            dueDate: format(toDate(date), "dd/MM/yyyy"),
        }
        project.listOfProjects[projectIndex].toDos.push(toDo)
        console.log(project.listOfProjects)
    }

    function editToDo(projectIndex,toDoIndex,newName,newDescription,newPriority,newStatus,newDate){
        project.listOfProjects[projectIndex].toDos[toDoIndex].name = newName
        project.listOfProjects[projectIndex].toDos[toDoIndex].description = newDescription
        project.listOfProjects[projectIndex].toDos[toDoIndex].priority = newPriority
        project.listOfProjects[projectIndex].toDos[toDoIndex].status = newStatus
        project.listOfProjects[projectIndex].toDos[toDoIndex].dueDate = format(toDate(newDate), "dd/MM/yyyy")
    }

    function toggleStatus(projectIndex,toDoIndex){
        if (project.listOfProjects[projectIndex].toDos[toDoIndex].status === "Incomplete"){
            project.listOfProjects[projectIndex].toDos[toDoIndex].status = "Complete"
        } else if (project.listOfProjects[projectIndex].toDos[toDoIndex].status === "Complete"){
            project.listOfProjects[projectIndex].toDos[toDoIndex].status = "Incomplete"
        }
        console.log(project.listOfProjects[projectIndex].toDos[toDoIndex].status)
    }

    function removeToDo(projectIndex, toDoIndex){
        project.listOfProjects[projectIndex].toDos.splice(toDoIndex,1)
    }

    function checkOverdue(projectIndex, toDoIndex) {
        const currentDate = new Date();
        const projectDate = parse(
            project.listOfProjects[projectIndex].toDos[toDoIndex].dueDate,
            "dd/MM/yyyy", 
            new Date()
        );
    
        if (isBefore(projectDate, currentDate)) {
            return "past";
        } else {
            return "future";
        }
    }

    return {createToDo, editToDo, removeToDo,checkOverdue, toggleStatus}
}

function displayModule(){

    function createDisplay(number){

        const bodyOfPage = document.querySelector("body")
        const gridContainer = document.createElement("div")
        gridContainer.classList.add("grid-container")
        const projectSidebar = document.createElement("div")
        const projectSidebarHeader = document.createElement("div")
        projectSidebarHeader.classList.add("project-sidebar-header")
        const projectSidebarHeaderText = document.createElement("div")
        projectSidebarHeaderText.classList.add("projects-header-text")
        projectSidebarHeaderText.textContent = "Projects"
        const projectSidebarHeaderIcon = document.createElement("div")
        projectSidebarHeaderIcon.classList.add("sidebar-header-icon")
        const image = document.createElement("img")
        image.classList.add("icon")
        image.src=plusImage
        image.style.cursor = "pointer";
        const image2 = document.createElement("img")
        image2.classList.add("icon")
        image2.classList.add("add-todo-icon")
        image2.src=plusImage
        image2.style.cursor = "pointer";
        projectSidebar.classList.add("project-sidebar")
        const projectDisplay = document.createElement("div")
        projectDisplay.classList.add("project-display")
        const projectDisplayHeader = document.createElement("div")
        projectDisplayHeader.classList.add("projects-display-header")
        const projectDisplayHeaderText = document.createElement("div")
        projectDisplayHeaderText.classList.add("projects-display-text")
        projectDisplayHeaderText.textContent = "Tasks for "+project.listOfProjects[number].name
        const projectDisplayHeaderIcon = document.createElement("div")
        projectDisplayHeaderIcon.classList.add("display-header-icon")
        projectDisplayHeader.appendChild(projectDisplayHeaderText)
        projectDisplayHeader.appendChild(projectDisplayHeaderIcon)
        projectDisplayHeaderIcon.appendChild(image2)
        projectSidebarHeader.appendChild(projectSidebarHeaderText)
        projectSidebarHeader.appendChild(projectSidebarHeaderIcon)
        projectSidebarHeaderIcon.appendChild(image)
        bodyOfPage.appendChild(gridContainer)
        gridContainer.appendChild(projectSidebar)
        gridContainer.appendChild(projectDisplay)
        projectSidebar.appendChild(projectSidebarHeader) 
        projectDisplay.appendChild(projectDisplayHeader)

        // sidebar-cards creation
        for (var i = 0; i<project.listOfProjects.length;i++){
            const projectCard = document.createElement("div")
            projectCard.id=i
            projectCard.classList.add('project-card')
            const projectCardText = document.createElement("div")
            projectCardText.textContent=project.listOfProjects[i].name
            projectCardText.classList.add('project-card-text')
            const projectCardIcon = document.createElement("div")
            projectCardIcon.classList.add('project-icon')
            const image3 = document.createElement("img")
            image3.classList.add("small-icon")
            image3.classList.add("rename-project-icon")
            image3.src=pencilImage
            image3.style.cursor = "pointer";
            const image4 = document.createElement("img")
            image4.classList.add("small-icon")
            image4.classList.add("delete-project-icon")
            image4.src=deleteImage
            image4.style.cursor = "pointer";
            projectCardText.addEventListener("click",function(){
                gridContainer.remove()
                createDisplay(projectCard.id)
            })
            image4.addEventListener("click",function(){
            gridContainer.remove()
            project.removeProject(projectCard.id)
            if (project.listOfProjects.length>=1){
                createDisplay(0)
            } else if (project.listOfProjects.length===0){
                createEmptyDisplay()
            }
            })
            image3.addEventListener('click', function(){
                const projectModal = document.querySelector(".rename-project-modal")
                const saveButtonRename = document.querySelector(".save-button-rename")
                saveButtonRename.id = projectCard.id
                projectModal.classList.add("show")

            })
            projectSidebar.appendChild(projectCard)
            projectCard.appendChild(projectCardText)
            projectCard.appendChild(projectCardIcon)
            projectCardIcon.appendChild(image3)
            projectCardIcon.appendChild(image4)

        }
        // to-do-cards creation
        const toDoGrid = document.createElement("div")
        toDoGrid.classList.add("todo-grid")
        projectDisplay.appendChild(toDoGrid)
        const newProjectButton = document.querySelector('.sidebar-header-icon')
        const projectModal = document.querySelector('.new-project-modal')
        newProjectButton.addEventListener('click', function(){
            projectModal.classList.add('show')
        })
        const newToDoButton = document.querySelector('.add-todo-icon')
        const newToDoSave = document.querySelector('.new-todo-save-icon')
        
        const newToDoModal = document.querySelector('.new-todo-modal')
        newToDoButton.addEventListener('click', function(){
            newToDoModal.classList.add('show')
            newToDoSave.id = number
        })
        for (var i = 0; i<project.listOfProjects[number].toDos.length;i++){
            const toDoCard = document.createElement("div")
            toDoCard.id=i
            toDoCard.classList.add('todo-card')
            const toDoName = document.createElement("div")
            toDoName.classList.add('todo-name')
            toDoName.innerHTML="<b>"+project.listOfProjects[number].toDos[toDoCard.id].name+"</b>"
            const toDoDescription = document.createElement("div")
            toDoDescription.classList.add('todo-description')
            toDoDescription.textContent=project.listOfProjects[number].toDos[toDoCard.id].description
            const toDoPriority = document.createElement("div")
            toDoPriority.classList.add('todo-priority')
            if(project.listOfProjects[number].toDos[toDoCard.id].priority === "1"){
                toDoPriority.innerHTML="<b>Priority:</b> High"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === "2"){
                toDoPriority.innerHTML="<b>Priority:</b> Medium"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === "3"){
                toDoPriority.innerHTML="<b>Priority:</b> Low"
            }
            const toDoStatus = document.createElement("div")
            toDoStatus.classList.add('todo-status')
            toDoStatus.innerHTML="<b>Status: </b> "+project.listOfProjects[number].toDos[toDoCard.id].status
            if (project.listOfProjects[number].toDos[toDoCard.id].status === "Complete"){
                toDoCard.classList.add('complete-todo')
            }
            const toDoDueDate = document.createElement("div")
            toDoDueDate.classList.add('todo-duedate')
            toDoDueDate.innerHTML="<b>Due Date: </b>"+project.listOfProjects[number].toDos[toDoCard.id].dueDate
            let resultOfCheck = toDo.checkOverdue(number,toDoCard.id)
            if ((resultOfCheck === "past") && (project.listOfProjects[number].toDos[toDoCard.id].status === "Incomplete")){
                toDoCard.classList.add('incomplete-todo')
            }
            const toDoActions = document.createElement("div")
            toDoActions.classList.add('todo-actions')
            const image5 = document.createElement("img")
            image5.classList.add("small-icon")
            image5.classList.add("mark-todo-complete-icon")
            image5.src=checkImage
            image5.style.cursor = "pointer";

            image5.addEventListener("click",function(){
                toDo.toggleStatus(number, toDoCard.id)
                gridContainer.remove()
                createDisplay(number)
                console.log(project.listOfProjects)
            })
            const image6 = document.createElement("img")
            image6.classList.add("small-icon")
            image6.classList.add("edit-todo-icon")
            image6.src=pencilImage
            image6.style.cursor = "pointer";
            image6.addEventListener('click', function(){
                const editToDoModal = document.querySelector(".edit-todo-modal")
                const editToDoModalSave = document.querySelector(".edit-todo-save-icon")
                const editToDoModalContainer = document.querySelector(".edit-todo-bottom-icon")
                editToDoModalContainer.id = number
                editToDoModalSave.id = toDoCard.id
                editToDoModal.classList.add("show")
            })
            const image7 = document.createElement("img")
            image7.classList.add("small-icon")
            image7.classList.add("delete-todo-icon")
            image7.src=deleteImage
            image7.style.cursor = "pointer";

            image7.addEventListener('click', function(){
                toDo.removeToDo(number,toDoCard.id)
                gridContainer.remove()
                createDisplay(number)
            })
            toDoGrid.appendChild(toDoCard)
            toDoCard.appendChild(toDoName)
            toDoCard.appendChild(toDoDescription)
            toDoCard.appendChild(toDoPriority)
            toDoCard.appendChild(toDoStatus)
            toDoCard.appendChild(toDoDueDate)
            toDoCard.appendChild(toDoActions)
            toDoActions.appendChild(image5)            
            toDoActions.appendChild(image6)
            toDoActions.appendChild(image7)

        }

    }
        
        function createEmptyDisplay(){
            const bodyOfPage = document.querySelector("body")
            const gridContainer = document.createElement("div")
            gridContainer.classList.add("grid-container")
            const projectSidebar = document.createElement("div")
            const projectSidebarHeader = document.createElement("div")
            projectSidebarHeader.classList.add("project-sidebar-header")
            const projectSidebarHeaderText = document.createElement("div")
            projectSidebarHeaderText.classList.add("projects-header-text")
            projectSidebarHeaderText.textContent = "Projects"
            const projectSidebarHeaderIcon = document.createElement("div")
            projectSidebarHeaderIcon.classList.add("sidebar-header-icon")
            const image = document.createElement("img")
            image.classList.add("icon")
            image.src=plusImage
            image.style.cursor = "pointer";
            const image2 = document.createElement("img")
            image2.classList.add("icon")
            image2.src=plusImage
            image2.style.cursor = "pointer";
            projectSidebar.classList.add("project-sidebar")
            const projectDisplay = document.createElement("div")
            projectDisplay.classList.add("project-display")
            projectSidebarHeader.appendChild(projectSidebarHeaderText)
            projectSidebarHeader.appendChild(projectSidebarHeaderIcon)
            projectSidebarHeaderIcon.appendChild(image)
            bodyOfPage.appendChild(gridContainer)
            gridContainer.appendChild(projectSidebar)
            gridContainer.appendChild(projectDisplay)
            projectSidebar.appendChild(projectSidebarHeader) 
            const newProjectButton = document.querySelector('.sidebar-header-icon')
            const projectModal = document.querySelector('.new-project-modal')
            newProjectButton.addEventListener('click', function(){
                projectModal.classList.add('show')
            })
    }
 

    return {createDisplay}
    
}

const toDo = toDoModule();

const project = projectModule();

const display = displayModule()

display.createDisplay(0)


const saveButton = document.querySelector('.save-button')
const projectInput = document.querySelector("#project-input")
saveButton.addEventListener('click', function(){
    const gridContainer = document.querySelector(".grid-container")
    const projectModal = document.querySelector(".new-project-modal")

    gridContainer.remove()

    projectModal.classList.remove('show')
    project.createProject(projectInput.value)
    display.createDisplay(project.listOfProjects.length-1)
    console.log(project.listOfProjects)
})



const closeButton = document.querySelector(".rename-close")
    closeButton.addEventListener('click',function(){
    const renameModal = document.querySelector(".rename-project-modal")
    renameModal.classList.remove('show')
})

const closeButtonNew = document.querySelector(".new-project-close")
    closeButtonNew.addEventListener('click',function(){
    const projectModal = document.querySelector(".new-project-modal")
    projectModal.classList.remove('show')
})

const saveButton2 = document.querySelector('.save-button-rename')
const renameInput = document.querySelector("#rename-input")
saveButton2.addEventListener('click', function(){
    const renameModal = document.querySelector(".rename-project-modal")
    const saveIcon = document.querySelector('.save-button-rename')
const gridContainer = document.querySelector(".grid-container")
gridContainer.remove()
renameModal.classList.remove('show')
project.renameProject(saveIcon.id, renameInput.value)
display.createDisplay(saveIcon.id)
console.log(project.listOfProjects)
})


const newToDoSave = document.querySelector('.new-todo-save-icon')

newToDoSave.addEventListener('click', function(){
    const toDo = toDoModule();
    const newToDoModal = document.querySelector(".new-todo-modal")
    const saveIcon = document.querySelector('.new-todo-save-icon')
const gridContainer = document.querySelector(".grid-container")
let newToDoName = document.querySelector("#name-input").value
let newToDoDescription = document.querySelector("#description-input").value
let newToDoPriority = document.querySelector("#priority-selector").value
let newToDoStatus = document.querySelector("#status-selector").value
let newToDoDate = document.querySelector("#due-date").value
gridContainer.remove()
newToDoModal.classList.remove('show')
toDo.createToDo(newToDoName, newToDoDescription, newToDoPriority, newToDoStatus, newToDoDate, saveIcon.id )
display.createDisplay(saveIcon.id)

console.log(project.listOfProjects)
})

const closeButtonNewToDo = document.querySelector(".new-todo-close")
closeButtonNewToDo.addEventListener('click',function(){
    const newToDoModal = document.querySelector(".new-todo-modal")
    newToDoModal.classList.remove('show')
})

const closeButtonEditToDo = document.querySelector(".edit-todo-close")
closeButtonEditToDo.addEventListener('click',function(){
    const editToDoModal = document.querySelector(".edit-todo-modal")
    editToDoModal.classList.remove('show')
})

const editToDoSave = document.querySelector('.edit-todo-save-icon')

editToDoSave.addEventListener('click', function(){
    const toDo = toDoModule();
    const editToDoModal = document.querySelector(".edit-todo-modal")
    const saveIcon = document.querySelector('.edit-todo-save-icon')
    const saveContainer = document.querySelector('.edit-todo-bottom-icon')

const gridContainer = document.querySelector(".grid-container")
let newToDoName = document.querySelector("#edit-name-input").value
let newToDoDescription = document.querySelector("#edit-description-input").value
let newToDoPriority = document.querySelector("#edit-priority-selector").value
let newToDoStatus = document.querySelector("#edit-status-selector").value
let newToDoDate = document.querySelector("#edit-due-date").value
gridContainer.remove()
editToDoModal.classList.remove('show')
toDo.editToDo(saveContainer.id, saveIcon.id, newToDoName, newToDoDescription, newToDoPriority, newToDoStatus, newToDoDate,  )
display.createDisplay(saveContainer.id)

console.log(project.listOfProjects)
})