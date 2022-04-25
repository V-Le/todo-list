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

import { parseISO, compareAsc, format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns'
import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');
const taskProjects = document.querySelector('#task-projects');

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



//Task constructor
function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    taskListArray.push(this);
};

const task1 = new Task('Eating and Pooping & Eating and Pooping', 'Exactly the name', '2021-02-20', 'high');
const task2 = new Task('Cooking', 'No', '2022-04-24', 'medium');
const task3 = new Task('Driving', 'No', '2022-04-28', 'high');
const task4 = new Task('Groceries', 'No', '2022-04-30', 'low');
const task5 = new Task('Cleaning', 'No', '2022-04-01', 'medium');
const task6 = new Task('Playing Games', 'Yes', '2025-07-13', 'low');
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
function clearContentSection() {
    const tasksSection = document.querySelector('.content-section');

    while (tasksSection.children.length > 3) {
        tasksSection.children[3].remove();
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
                                        <td>${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
    });
};

//export default, imports into index.js, ./components/tasks.js
function writeTaskAll() {
    const addTaskBtn = document.querySelector('#btn-addTask');
    addTaskBtn.className = 'btn-addTask-show';

    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray);
    displayTask(sortedArrayByDateAsc);
};

//function writeTaskToday()
//    displayTasks().filter() library with today's date
function writeTaskToday() {
    const addTaskBtn = document.querySelector('#btn-addTask');
    addTaskBtn.className = 'btn-addTask-hide';

    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByDayAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfDay(), getEndOfDay());
    displayTask(sortedArrayByDayAsc);
};

//function writeTaskWeek()
//    displayTask().filter() library with week range

function dateFormat(date) {
    return format(new Date(date), 'MMM / dd / yyyy');
};

function sortArrayDateAscending(arrayList) {
    return ([...arrayList].sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))));
};

function filterArrayDate(arrayList, startDate, endDate) {
    return arrayList.filter((date) => {
        let arrayDate = new Date(date.dueDate);
        return (arrayDate >= new Date(startDate) && arrayDate <= new Date(endDate));
    });
};

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

var test = new Date('2022-04-24')
console.log(new Date('04-24-2022'));
console.log(test);