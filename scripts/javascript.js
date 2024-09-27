const form = document.getElementById('form');
const input = document.getElementById('task-input'); 
const toDoList = document.getElementById('to-do-list');
const label = document.createElement('label'); 


label.classList.add('error-message'); 

let tasks = [
    { id: 1, title: 'Sacar la basura', markedAsDone: false },
    { id: 2, title: 'Comprar parafina', markedAsDone: false },
    { id: 3, title: 'Tender la ropa', markedAsDone: false }
];

const totalTasks = document.getElementById('total-tasks');
const tasksDone = document.getElementById('tasks-done');

document.addEventListener("DOMContentLoaded", () => {
    initialTaks();
    countTasks();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskTitle = input.value.trim(); 

    if (taskTitle) {
        const taskExist = tasks.some(task => task.title.toLowerCase() === taskTitle.toLowerCase());

        if (taskExist) {
            label.innerHTML = 'Esta tarea ya existe';  
            form.appendChild(label);  
        } else {
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                markedAsDone: false
            };
            tasks.push(newTask);  
            initialTaks();  
            input.value = '';  
            label.innerHTML = '';  
        }
    } else {
        label.innerHTML = 'Debes ingresar un título válido';  
        form.appendChild(label);  
    }
});

const initialTaks = () => {
    let template = '';
    for (const task of tasks) {
        template += createElement(task);  
    toDoList.innerHTML = template;  
};
}

function createElement(task) {
    return `
        <div class="alert ${task.markedAsDone ? 'alert-success' : 'alert-secondary'} d-flex justify-content-between align-items-center">
            <p class="m-0">${task.title}</p>
            <h3 class="m-0">
                <i class="fa-solid fa-check" role="button" onclick="taskDone(${task.id})"></i>
                <i class="fa-solid fa-trash" role="button" onclick="deleteTask(${task.id})"></i>
            </h3>
        </div>
    `;
}
function taskDone(id) {
    const indexTask = tasks.findIndex((task) => task.id === id);
    tasks[indexTask].markedAsDone = tasks[indexTask].markedAsDone ? false : true;
    initialTaks();  
    countTasks();
}

function deleteTask(id) {
    const indexTask = tasks.findIndex((task) => task.id === id);
    tasks.splice(indexTask,1) 
    initialTaks(); 
    countTasks();
}


function countTasks (){
    totalTasks.innerHTML =  `Total de tareas: ${tasks.length}`;
    const totalTasksDone = tasks.filter((m) => m.markedAsDone == true)
    tasksDone.innerHTML = `Tareas realizadas: ${totalTasksDone.length}`
}

