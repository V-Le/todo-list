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

const task1 = new Task('Eating and Pooping & Eating and Pooping', 'Exactly the name', '2021-02-20', 'high');
const task2 = new Task('Cooking', 'No', '2022-05-09', 'medium');
const task3 = new Task('Driving', 'No', '2022-05-09', 'high');
const task4 = new Task('Groceries', 'No', '2022-05-10', 'low');
const task5 = new Task('Cleaning', 'No', '2022-05-03', 'medium');
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

//Modal function
const submitBtn = document.querySelector('#task-submit');

submitBtn.addEventListener('click', () => {
    submitTasktoTaskList();
    clearContentSection();
    clearTableList();
    writeTaskAll();
});

function submitTasktoTaskList() {
    let title = document.querySelector('#task-title').value;
    let description = document.querySelector('#task-description').value;
    let dueDate = document.querySelector('#task-dueDate').value;
    let priority = document.querySelector('#task-priority').value;
    
    if (title == '' || description == '' || dueDate == '' ) {
        console.log('Fail');
    } else {
        const task =  new Task(title, description, dueDate, priority);
        const myForm = document.querySelector('#myForm').reset();
        modalContainer.style.display = 'none';
    }
}


/* Test
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
                                        <td>${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
    });
};

//export default, imports into index.js, ./components/tasks.js
function writeTaskAll() {
    
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray);
    displayTask(sortedArrayByDateAsc);
    deleteTasks(writeTaskAll);
};

//filter() library with today's date
function writeTaskToday() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByDayAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfDay(), getEndOfDay());
    displayTask(sortedArrayByDayAsc);
};

//filter() library with week range
function writeTaskWeek() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByWeekyAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfWeek(), getEndOfWeek());
    displayTask(sortedArrayByWeekyAsc);
}

function dateFormat(date) {
    return format(parseISO(date), 'MMM / dd / yyyy');
};

function sortArrayDateAscending(arrayList) {
    return ([...arrayList].sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))));
};

function filterArrayDate(arrayList, startDate, endDate) {
    return arrayList.filter((date) => {
        let arrayDate = parseISO(date.dueDate);
        return (arrayDate >= new Date(startDate) && arrayDate <= new Date(endDate));
    });
};

function deleteTasks(writeTask) {
    const deleteTaskBtn = document.querySelectorAll('.btn-trash');

    for (let i=0; i <= deleteTaskBtn.length-1; i++) {
        deleteTaskBtn[i].addEventListener('click', function() {
            console.log(i)
            taskListArray.splice(i,1);
            clearContentSection();
            clearTableList();
            writeTask();
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