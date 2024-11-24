import "./styles.css";
import { format } from "date-fns";


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

    function getProjects(){
        return listOfProjects
    }

    function createProject(name){
        let project = {
            name: name,
            toDos: []
        }
        listOfProjects.push(project)
    } 

    function addToDoToProject(projectname){
        listOfProjects.projectname.toDos.push()
        console.log(listOfProjects)
    }

        return {listOfProjects, createProject, addToDoToProject,getProjects}
}

    function createToDo (name, description, priority, status, dueDate, project){

        const project = projectModule();

        let toDo = {
            name: name,
            description: description,
            priority: priority,
            status: status,
            dueDate: dueDate,
        }

        for (var i = 0; i<=projectArray.length;i++)
            if (projectArray[i].name === project){
                projectArray[i].push(toDo)
            }
    }
    
    
  
    createToDo("Rob your bank", "With a gun", "High", "Incomplete", "24/11/2024", "Rob Bank")
    
    


