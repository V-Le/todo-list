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
- DESCRIPTION
- DUE DATE
--priority
- EDIT
- DELETE
 
***Navagation Bar Left***
- today
- this week
- all

 */

//import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
const taskProjects = document.querySelector('#task-projects');

writeTaskAll();

taskAll.addEventListener('click', writeTaskAll);
taskToday.addEventListener('click', writeTaskToday);

var taskListArray = [];

//Task constructor
function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority
    taskListArray.push(this);
}

const task1 = new Task('Eating and Pooping', 'Exactly the name', 'June 5', 'high');

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

    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('style', 'width: 50px; height: 50px; background-color: red;')
    tasksSection.appendChild(taskDiv);
}

//function writeTaskToday()
//    clearSection()
//    date.sort()
//    displayTasks().filter() library with today's date
function writeTaskToday() {
    clearSection();
    
    const tasksSection = document.querySelector('.tasks-section');

    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('style', 'width: 50px; height: 50px; background-color: blue;')
    tasksSection.appendChild(taskDiv);
}

/*
function writeTaskWeek()
    clearSection()
    date.sort()
    displayTask().filter() library with week range

function date()
    return date in readable format    

*/
