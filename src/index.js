import { el } from "date-fns/locale";
import "./styles.css";
import { format, isToday, toDate } from "date-fns";
import plusImage from "./images/plus.svg"; 
import deleteImage from "./images/delete.svg"; 
import pencilImage from "./images/pencil-outline.svg"; 
import checkImage from "./images/check.svg"; 


function projectModule(){
    
    const listOfProjects = [
        {
            "name": "Today",
            toDos: [{
            name: "How good is this!?",
            description:"It's working!",
            priority: 1,
            status: "Incomplete",
            dueDate: format(toDate("2026-12-06"), "dd/MM/yyyy")
            },
            {
                name: "How good is this!?",
                description:"It's working!",
                priority: 1,
                status: "Complete",
                dueDate: format(toDate("2024-02-04"), "dd/MM/yyyy")
            },
            {
                name: "How good is this!?",
                description:"It's working!",
                priority: 1,
                status: "Incomplete",
                dueDate: format(toDate("1990-12-06"), "dd/MM/yyyy")
            }]
        }
        ,
        {
            "name": "Dj Khaled",
            toDos: [{
                name: "Another one",
                description:"WE THE BEST MUSIC!",
                priority: 1,
                status: "Complete",
                dueDate: "12-11-2024"
            },
            {
                name: "Let's go golfing",
                description:"It's working!",
                priority: 1,
                status: "Incomplete",
                dueDate: "22-11-2024"
            }]
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

    function checkOverdue(projectIndex, toDoIndex){
        let currentDate = new Date()
        let projectDate = project.listOfProjects[projectIndex].toDos[toDoIndex].dueDate
        let parsedCurrent = Date.parse(currentDate)
        let parsedProject = Date.parse(projectDate)
        if (parsedCurrent>parsedProject){
            return "past"
        } else {
            return "future"
        }  
    }

    return {createToDo, editToDo, removeToDo, toggleStatus,checkOverdue}
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
            image3.src=pencilImage
            const image4 = document.createElement("img")
            image4.classList.add("small-icon")
            image4.src=deleteImage
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
            if(project.listOfProjects[number].toDos[toDoCard.id].priority === 1){
                toDoPriority.innerHTML="<b>Priority:</b> High"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === 2){
                toDoPriority.textContent="<b>Priority:</b>Medium"
            } else if(project.listOfProjects[number].toDos[toDoCard.id].priority === 3){
                toDoPriority.textContent="<b>Priority:</b>Low"
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
            console.log(resultOfCheck)
            if ((resultOfCheck === "past") && (project.listOfProjects[number].toDos[toDoCard.id].status === "Incomplete")){
                toDoCard.classList.add('incomplete-todo')
            }
            const toDoActions = document.createElement("div")
            toDoActions.classList.add('todo-actions')
            const image5 = document.createElement("img")
            image5.classList.add("small-icon")
            image5.src=checkImage
            const image6 = document.createElement("img")
            image6.classList.add("small-icon")
            image6.src=pencilImage
            const image7 = document.createElement("img")
            image7.classList.add("small-icon")
            image7.src=deleteImage
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


