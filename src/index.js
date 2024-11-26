import { el } from "date-fns/locale";
import "./styles.css";
import { format, toDate } from "date-fns";
import plusImage from "./images/plus.svg"; 
import deleteImage from "./images/delete.svg"; 


function projectModule(){
    
    const listOfProjects = [
        {
            "name": "Today",
            toDos: [{
            name: "How good is this!?",
            description:"It's working!",
            priority: 1,
            status: "Incomplete",
            dueDate: "2024-11-12"
            },
            {
                name: "How good is this!?",
                description:"It's working!",
                priority: 1,
                status: "Incomplete",
                dueDate: "2024-11-12"
            },
            {
                name: "How good is this!?",
                description:"It's working!",
                priority: 1,
                status: "Incomplete",
                dueDate: "2024-11-12"
            }]
        }
        ,
        {
            "name": "Dj Khaled",
            toDos: []
        }
        
    ]

    function sortToDoPriority(projectIndex){

        let project = {
            name: listOfProjects[projectIndex].name,
            toDos: listOfProjects[projectIndex].toDos.sort((a, b) => a.priority - b.priority)
        }
        projectByPriority = project

       console.log(projectByPriority)

    }    

    function selectActiveProject(projectIndex){
         currentProject = listOfProjects[projectIndex]
        console.log(currentProject)
    }    


    let priorityToggle = false

    let projectByPriority = 0

    let currentProject = 0

    function togglePriority(){
        if (priorityToggle === false){
            priorityToggle = true
        } else if (priorityToggle === true)
        {priorityToggle = false}
    }

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

    return {listOfProjects, sortToDoPriority, selectActiveProject, togglePriority, createProject, renameProject, removeProject, switchProject }

}

function toDoModule(){
    
    const project = projectModule();

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
    }

    function removeToDo(projectIndex, toDoIndex){
        project.listOfProjects[projectIndex].toDos.splice(toDoIndex,1)
    }

    return {createToDo, editToDo, removeToDo, toggleStatus}
}

function displayModule(){

    const toDo = toDoModule();

    const project = projectModule();

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
        const image2 = document.createElement("img")
        image2.classList.add("icon")
        image2.src=plusImage
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
            image3.src=deleteImage
            projectCardText.addEventListener("click",function(){
                gridContainer.remove()
                createDisplay(projectCard.id)
            })
            projectCardIcon.addEventListener("click",function(){
            gridContainer.remove()
            project.removeProject(projectCard.id)
            console.log(project.listOfProjects)
            if (project.listOfProjects.length>=1){
                createDisplay(0)
            } else if (project.listOfProjects.length===0){
                createEmptyDisplay()
            }
            })
            projectSidebar.appendChild(projectCard)
            projectCard.appendChild(projectCardText)
            projectCard.appendChild(projectCardIcon)
            projectCardIcon.appendChild(image3)
        }
        // to-do-cards creation
        const toDoGrid = document.createElement("div")
        toDoGrid.classList.add("todo-grid")
        projectDisplay.appendChild(toDoGrid)

        for (var i = 0; i<project.listOfProjects[number].toDos.length;i++){
            const toDoCard = document.createElement("div")
            toDoCard.id=i
            toDoCard.classList.add('todo-card')
            const toDoName = document.createElement("div")
            toDoName.classList.add('todo-name')
            toDoName.textContent=project.listOfProjects[number].toDos[toDoCard.id].name
            const toDoDescription = document.createElement("div")
            toDoDescription.classList.add('todo-description')
            toDoDescription.textContent=project.listOfProjects[number].toDos[toDoCard.id].description
            const toDoPriority = document.createElement("div")
            toDoPriority.classList.add('todo-priority')
            if(project.listOfProjects[number].toDos[toDoCard.id].priority === 1){
                toDoPriority.textContent="High"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === 2){
                toDoPriority.textContent="Medium"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === 3){
                toDoPriority.textContent="Low"
            }
            const toDoStatus = document.createElement("div")
            toDoStatus.classList.add('todo-status')
            toDoStatus.textContent=project.listOfProjects[number].toDos[toDoCard.id].status
            const toDoDueDate = document.createElement("div")
            toDoDueDate.classList.add('todo-duedate')
            toDoDueDate.textContent=project.listOfProjects[number].toDos[toDoCard.id].dueDate
            toDoGrid.appendChild(toDoCard)
            toDoCard.appendChild(toDoName)
            toDoCard.appendChild(toDoDescription)
            toDoCard.appendChild(toDoPriority)
            toDoCard.appendChild(toDoStatus)
            toDoCard.appendChild(toDoDueDate)
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
            const image2 = document.createElement("img")
            image2.classList.add("icon")
            image2.src=plusImage
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
    }
    
    return {createDisplay}
}

const display = displayModule()

display.createDisplay(0)