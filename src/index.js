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

import './styles/style.css';
import './components/tasks.js';
import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
const taskProjects = document.querySelector('#task-projects');

writeline();

taskAll.addEventListener('click', writeline);


/*

create initial library array = [];

factory function task(titleOfTask, shortDescription, dueDate, priority)
    this.title
    this.desc
    this.date
    this.priority
    push to library array

Get values from form fields then delete fields
    #title.value
    #desc.value
    #date.value
    #priority.value
        Low
        Medium
        High
    send to factory function task(title, desc, date, priority)

function display library array of tasks()
    forEach object, create and append child
    SELECTION-BOX  |  Task Title  |  Short Description  |  Date Due  |  Priority  |  EDIT  |  DELETE

function markAsComplete()
    addEventListener to completion icon to add class to style task object greyed out

function deleteTask()
    addEventListener to splice library array by one object to delete

function editTask()
    addEventListner for object to display with current values, then save new editted values

function priorityStyling()
    if (priority == Low)
        add class to style task background to green
    if (priority == Medium)
        add class to style task background to yellow
    if (priority == High)
        add class to style task background to red

function taskToday
    .filter library with today's date

function taskWeek
    .filter library with week's date
*/
