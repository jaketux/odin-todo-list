import "./styles.css";
import { format } from "date-fns";


const project = projectModule();

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
                "assignedProject": "Study The Odin Project",
            }]
        }
    ]

    function createProject(name){
    
        let project = {
            name: name,
            toDos: []
        }

        for (var i = 0; i<=listOfProjects.length; i++){
            if (listOfProjects[i].name !== name){
                listOfProjects.push(project)
                console.log(listOfProjects)
            }
        }
    }

    function pushProjecToList(projectName){

    }
    

    function addToDoToProject(projectname){
        listOfProjects.projectname.toDos.push()
        console.log(listOfProjects)
    }

    return {listOfProjects, createProject, addToDoToProject, pushProjecToList}

}

    function createToDo (name, description, priority, status, dueDate){
        let toDo = {
            name: name,
            description: description,
            priority: priority,
            status: status,
            dueDate: dueDate,
            assignedProject: 0,
        }
        return toDo

    }
    
    
console.log(createToDo("Rob your bank", "With a gun", "High", "Incomplete", "24/11/2024", "Rob Bank"))

project.createProject("Study The Odin Project")


