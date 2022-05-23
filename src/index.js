/**
To do list
================
FUNCTIONS
.............
- MARK AS COMPLETE
 */

import { parseISO, compareAsc, format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns'
import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
//const taskProjects = document.querySelector('#task-projects');

var taskListArray = [];

taskAll.addEventListener('click', () => { 
    clearContentSection();
    clearTableList();
    writeTaskAll();
});

taskToday.addEventListener('click', () => {
    clearContentSection();
    clearTableList();
    writeTaskToday();
});

taskWeek.addEventListener('click', () => {
    clearContentSection();
    clearTableList();
    writeTaskWeek();
});



//Task constructor
function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    taskListArray.push(this);
};

const task0 = new Task('Eating and Pooping & Eating and Pooping', 'Exactly the name', '2021-02-20', 'Urgent');
const task1 = new Task('Cooking', 'No', '2022-05-09', 'Medium');
const task2 = new Task('Driving', 'No', '2022-05-09', 'Urgent');
const task3 = new Task('Groceries', 'No', '2022-05-10', 'Low');
const task4 = new Task('Cleaning', 'No', '2022-05-03', 'Medium');
const task5 = new Task('Playing Games', 'Yes', '2025-07-13', 'Low');
const task6 = new Task('Swerv', 'No', '2022-05-10', 'Low');
const task7 = new Task('Counting', 'No', '2022-05-14', 'Medium');
const task8 = new Task('fishing', 'Yes', '2025-07-13', 'Low');

writeTaskAll();

//Modal display functionality
const modalContainer = document.querySelector('#modal-container');
const addTaskBtn = document.querySelector('#btn-addTask');
const closeTaskbtn = document.querySelector('#close-myForm');


addTaskBtn.addEventListener('click', function() {
    modalContainer.style.display = 'flex';
});

closeTaskbtn.addEventListener('click', function(){
    modalContainer.style.display = 'none';
    document.querySelector('#myForm').reset()
});

window.addEventListener('click', function(e) {
    if (e.target == modalContainer) {
        modalContainer.style.display = 'none';
        document.querySelector('#myForm').reset()
    }
});

//Modal function
function submitAdd(writeTask) {
    let modalAddTask = document.querySelector('#task-add');
    modalAddTask.addEventListener('click', () => {
        addTasktoTaskList();
        clearContentSection();
        clearTableList();
        writeTask();
        priorityStyling()
    });
}

function addTasktoTaskList() {
    let title = document.querySelector('#task-title').value;
    let description = document.querySelector('#task-description').value;
    let dueDate = document.querySelector('#task-dueDate').value;
    let priority = document.querySelector('#task-priority').value;
    
    if (title == '' || description == '' || dueDate == '' ) {
        console.log('Fail');
    }
    else {
        const task =  new Task(title, description, dueDate, priority);
        modalContainer.style.display = 'none';
        document.querySelector('#myForm').reset()
    }
}

function submitEdit(writeTask, editTask) {
    let modalEditTask = document.querySelector('#task-edit');
    modalContainer.style.display = 'flex';

    let title = document.querySelector('#task-title');
    let description = document.querySelector('#task-description');
    let dueDate = document.querySelector('#task-dueDate');
    let priority = document.querySelector('#task-priority');

    title.value = taskListArray[editTask].title;
    description.value = taskListArray[editTask].description;
    dueDate.value = taskListArray[editTask].dueDate;
    priority.value = taskListArray[editTask].priority;

    modalEditTask.addEventListener('click', () => {
        editTasktoTaskList(editTask, title.value, description.value, dueDate.value, priority.value);
/*         clearContentSection();
        clearTableList();
        writeTask();
        priorityStyling() */
    });
}

function editTasktoTaskList(editTask, title, description, dueDate, priority) {
    //console.log(taskListArray[editTask].title)

    if (title == '' || description == '' || dueDate == '' ) {
        console.log('Fail');
    }
    else {
        taskListArray[editTask].title = title;
        taskListArray[editTask].description = description;
        taskListArray[editTask].dueDate = dueDate;
        taskListArray[editTask].priority = priority;
        modalContainer.style.display = 'none';
        document.querySelector('#myForm').reset()
    }
}

//export default, imports into tasks.js, ./functions/clearSection.js
function clearContentSection() {
    const tasksSection = document.querySelector('.content-section');

    while (tasksSection.children.length > 2) {
        tasksSection.children[2].remove();
    };
};

function clearTableList() {;
    const taskListTable = document.querySelector('#table-taskList');
    taskListTable.removeChild(taskListTable.lastChild);
};

function displayTask(tasks) {
    const taskListTable = document.querySelector('#table-taskList');
    const taskListTableBody = document.createElement('tbody');
    taskListTable.appendChild(taskListTableBody);

    tasks.forEach(function(task) {
        const taskListTableRow = document.createElement('tr');
        taskListTableRow.innerHTML = `<td>${task.title}</td>
                                        <td>${dateFormat(task.dueDate)}</td>
                                        <td id="td-priority">${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
    });
    priorityStyling();
};

//export default, imports into index.js, ./components/tasks.js
function writeTaskAll() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray);
    displayTask(sortedArrayByDateAsc);
    editTasks(writeTaskAll, sortedArrayByDateAsc);
    deleteTasks(writeTaskAll, sortedArrayByDateAsc);
    submitAdd(writeTaskAll);
};

//filter() library with today's date
function writeTaskToday() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByDayAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfDay(), getEndOfDay());
    displayTask(sortedArrayByDayAsc);
    //editTasks(writeTaskToday, sortedArrayByDayAsc);
    deleteTasks(writeTaskToday, sortedArrayByDayAsc);
    submitAdd(writeTaskToday);
};

//filter() library with week range
function writeTaskWeek() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByWeekyAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfWeek(), getEndOfWeek());
    displayTask(sortedArrayByWeekyAsc);
    //editTasks(writeTaskWeek, sortedArrayByWeekyAsc);
    deleteTasks(writeTaskWeek, sortedArrayByWeekyAsc);
    submitAdd(writeTaskWeek);
}

function dateFormat(date) {
    return format(parseISO(date), 'MMM / dd / yyyy');
};

function sortArrayDateAscending(arrayList) {
    return ([...arrayList].sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))));
};

//filters the array dates depending on what is passed
function filterArrayDate(arrayList, startDate, endDate) {
    return arrayList.filter((date) => {
        let arrayDate = parseISO(date.dueDate);
        return (arrayDate >= new Date(startDate) && arrayDate <= new Date(endDate));
    });
};

function priorityStyling() {
    const tdPriority = document.querySelectorAll('#td-priority');
    
    tdPriority.forEach((priorityText) => {
        if (priorityText.innerText == 'Low') {
            priorityText.setAttribute('style', 'background-color: #eff6ed;')
        }
        else if (priorityText.innerText == 'Medium') {
            priorityText.setAttribute('style', 'background-color: #fff9e6;')
        }
        else if (priorityText.innerText == 'Urgent') {
            priorityText.setAttribute('style', 'background-color: #f4c1c1;')
        }
    });
};

//adds eventlistener to return index of taskListArray with current list and deletes
function deleteTasks(writeTask, deleteArray) {
    const deleteTaskBtn = document.querySelectorAll('.btn-trash');

    for (let i=0; i <= deleteTaskBtn.length-1; i++) {
        deleteTaskBtn[i].addEventListener('click', function() {
            let deleteTask = taskListArray.map(function(task) { return task.title;}).indexOf(deleteArray[i].title);
            taskListArray.splice(deleteTask,1);
            clearContentSection();
            clearTableList();
            writeTask();
        })
        
    }
}

function editTasks(writeTask, editArray) {
    const editTaskBtn = document.querySelectorAll('.btn-edit');

    for (let i=0; i <= editTaskBtn.length-1; i++) {
        editTaskBtn[i].addEventListener('click', function() { 
            let editTask = taskListArray.map(function(task) { return task.title;}).indexOf(editArray[i].title);
            submitEdit(writeTask, editTask)
        })
        
    }
}

function getStartOfDay() {
    return startOfDay(new Date());
}

function getEndOfDay() {
    return endOfDay(new Date());
}

function getStartOfWeek() {
    return startOfWeek(new Date());
}

function getEndOfWeek() {
    return endOfWeek(new Date());
}