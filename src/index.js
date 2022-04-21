/**
To do list
================
FUNCTIONS
.............
***Base function tile***
- ADD TASK
--select multiple box
- MARK AS COMPLETE
- TITLE
- DESCRIPTION (When clicked)
- DUE DATE
--priority
- EDIT
- DELETE
 
***Navagation Bar Left***
- today
- this week
- all

 */

import { parseISO, compareAsc, format } from 'date-fns'
import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
const taskProjects = document.querySelector('#task-projects');

var taskListArray = [];

taskAll.addEventListener('click', () => { 
    clearSection();
    clearTableList();
    writeTaskAll();
});
taskToday.addEventListener('click', () => {
    clearSection();
    clearTableList();
    writeTaskToday();
});



//Task constructor
function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
    taskListArray.push(this);
}

const task1 = new Task('Eating and Pooping', 'Exactly the name', 'June 5', 'high');
const task2 = new Task('Playing Games', 'Yes', 'May 25', 'low');


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
});

window.addEventListener('click', function(e) {
    if (e.target == modalContainer) {
        modalContainer.style.display = 'none';
    }
});

//Get values from form fields then delete fields
// #title.value
// #desc.value
// #date.value
// #priority.value
//     Low
//     Medium
//     High
// send to factory function task(title, desc, date, priority)

/*
function displayTasks()
    forEach object, create and append child
    SELECTION-BOX  |  Task Title  |  Short Description  |  Date Due  |  Priority  |  EDIT  |  DELETE

function markAsComplete()
    addEventListener to completion icon to add class to style task object greyed out

function deleteTask()
    addEventListener to splice library array by one object to delete

function deleteCheckedTasks()
    

function editTask()
    addEventListner for object to display with current values, then save new editted values

function priorityStyling()
    if (priority == Low)
        add class to style task background to green
    if (priority == Medium)
        add class to style task background to yellow
    if (priority == High)
        add class to style task background to red
*/

//export default, imports into tasks.js, ./functions/clearSection.js
function clearSection() {
    const tasksSection = document.querySelector('.tasks-section');

    while (tasksSection.children.length > 3) {
        tasksSection.children[3].remove();
    }
}

function clearTableList() {
    const taskListTable = document.querySelector('#table-taskList');
    taskListTable.removeChild(taskListTable.lastChild);
}

//function writeTaskAll()
//    clearSection() - Done
//    date.sort()
//    displayTask() - Done
//export default, imports into index.js, ./components/tasks.js
function writeTaskAll() {
    const addTaskBtn = document.querySelector('#btn-addTask');
    const taskListTable = document.querySelector('#table-taskList');
    addTaskBtn.className = 'btn-addTask-show';

    const taskListTableBody = document.createElement('tbody');
    taskListTable.appendChild(taskListTableBody);
    
    //Creating task list on page
    taskListArray.forEach(function(task) {
        const taskListTableRow = document.createElement('tr');
        taskListTableRow.innerHTML = `<td>${task.title}</td>
                                        <td>${task.dueDate}</td>
                                        <td>${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
    });
}

//function writeTaskToday()
//    clearSection()
//    date.sort()
//    displayTasks().filter() library with today's date
function writeTaskToday() {
    const addTaskBtn = document.querySelector('#btn-addTask');
    const taskListTable = document.querySelector('#table-taskList');
    addTaskBtn.className = 'btn-addTask-hide';

    const taskListTableBody = document.createElement('tbody');
    taskListTable.appendChild(taskListTableBody);
    
    //Creating task list on page
    taskListArray.forEach(function(task) {
        const taskListTableRow = document.createElement('tr');
        taskListTable.style.color = 'red';
        taskListTableRow.innerHTML = `<td>${task.title}</td>
                                        <td>${task.dueDate}</td>
                                        <td>${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
    });

}



/*
function writeTaskWeek()
    clearSection()
    date.sort()
    displayTask().filter() library with week range
*/

function date(date) {
    return format(new Date(date), 'MM-yyyy-dd');
}

const result = parseISO('2014-02-11T11:30:30')
console.log(result)

