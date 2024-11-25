import "./styles.css";
import { format, toDate } from "date-fns";


function projectModule(){
    
    let listOfProjects = [
        {
            "name": "Study The Odin Project",
            toDos: [{
                "name": "Read assignment",
                "description": "Read the notes for To-Do List",
                "priority": "High",
                "status": "Complete",
                "dueDate": format(Date(2024,11,24), "dd/MM/yyyy"),
            },
            {
                "name": "Get the job done",
                "description": "We damage we",
                "priority": "High",
                "status": "Complete",
                "dueDate": format(Date(2024,11,24), "dd/MM/yyyy"),
            }]
        }
    ]

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

        return {listOfProjects, createProject, renameProject, removeProject}

}

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




    // function toggleToDoStatus(projectIndex,toDoIndex){
    //     if (project.listOfProjects[projectIndex].toDos[toDoIndex].status === "Incomplete"){
    //         project.listOfProjects[projectIndex].toDos[toDoIndex].status = "Complete"
    //     } else if (project.listOfProjects[projectIndex].toDos[toDoIndex].status === "Complete"){
    //         project.listOfProjects[projectIndex].toDos[toDoIndex].status = "Incomplete"
    //     }
    //     console.log(project.listOfProjects)
    // }

    // function changeToDoName(projectIndex,toDoIndex, newName){
    //     project.listOfProjects[projectIndex].toDos[toDoIndex].name = newName
    //     console.log(project.listOfProjects)
    // }
    

    // function removeToDo(projectIndex,toDoIndex){
    //     project.listOfProjects[projectIndex].toDos.splice(toDoIndex, 1)
    //     console.log(project.listOfProjects)
    // }

    // function changeToDoPriority(projectIndex,toDoIndex, newPriority){
    //     project.listOfProjects[projectIndex].toDos[toDoIndex].priority = newPriority
    //     console.log(project.listOfProjects)
    // }

    // function changeToDoDate(projectIndex,toDoIndex, date){
    //     project.listOfProjects[projectIndex].toDos[toDoIndex].dueDate = format(toDate(date), "dd/MM/yyyy")
    //     console.log(project.listOfProjects)
    // }

    function switchToDoProject(projectIndex, newProjectIndex, toDoIndex){
        project.listOfProjects[newProjectIndex].toDos.push(project.listOfProjects[projectIndex].toDos[toDoIndex])
        project.listOfProjects[projectIndex].toDos.splice(toDoIndex, 1)
        console.log(project.listOfProjects)
    }

    project.createProject("This is a test")
    createToDo("Testing Name", "Testing Description", "High", "Incomplete", "2024-11-26",1)

    editToDo(1,0,"The real test is now", "Without testing we cannot know", "Low", "Incomplete","2042-11-21")

    switchToDoProject(1,0,0)
