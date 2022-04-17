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

import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
const taskProjects = document.querySelector('#task-projects');

var taskListArray = [];

taskAll.addEventListener('click', writeTaskAll);
taskToday.addEventListener('click', writeTaskToday);



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

/*
Get values from form fields then delete fields
    #title.value
    #desc.value
    #date.value
    #priority.value
        Low
        Medium
        High
    send to factory function task(title, desc, date, priority)

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

    while (tasksSection.children.length > 0) {
        tasksSection.children[0].remove();
    }
}

//function writeTaskAll()
//    clearSection()
//    date.sort()
//    displayTask()
//export default, imports into index.js, ./components/tasks.js
function writeTaskAll() {
    clearSection();

    const tasksSection = document.querySelector('.tasks-section');

    const taskListTable = document.createElement('table');
    taskListTable.innerHTML =   `<thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Edit</th>
                                        <th>Del</th>
                                    </tr>
                                </thead>`;
    tasksSection.appendChild(taskListTable);

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

    const addTaskBtn = document.createElement('tr');
    addTaskBtn.innerHTML = '<button class="btn-add">Add Task</button>';
    taskListTableBody.appendChild(addTaskBtn);
}

//function writeTaskToday()
//    clearSection()
//    date.sort()
//    displayTasks().filter() library with today's date
function writeTaskToday() {
    clearSection();
    
    const tasksSection = document.querySelector('.tasks-section');

    const TaskListTable = document.createElement('table');
    TaskListTable.setAttribute('style', 'width: 50px; height: 50px; background-color: blue;')
    tasksSection.appendChild(TaskListTable);
}

/*
function writeTaskWeek()
    clearSection()
    date.sort()
    displayTask().filter() library with week range

function date()
    return date in readable format    

*/
