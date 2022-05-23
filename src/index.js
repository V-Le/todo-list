/**
To do list
================
FUNCTIONS
.............
--select multiple box
- MARK AS COMPLETE
 */

import { parseISO, compareAsc, format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns'
import './styles/style.css';
//import './components/tasks.js';
//import writeline from './components/tasks.js';

const taskAll = document.querySelector('#task-all');
const taskToday = document.querySelector('#task-today');
const taskWeek = document.querySelector('#task-week');

var taskListArray = [];
var page;

taskAll.addEventListener('click', () => { 
    clearContentSection();
    writeTaskAll();
});

taskToday.addEventListener('click', () => {
    clearContentSection();
    writeTaskToday();
});

taskWeek.addEventListener('click', () => {
    clearContentSection();
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

//Modal display functionality
const modalContainer = document.querySelector('#modal-container');
const addTaskBtn = document.querySelector('#btn-addTask');
const closeTaskbtn = document.querySelector('#close-myForm');

const submitBtn = document.querySelector('#task-add');
const submitEdit = document.querySelector('#task-edit');

addTaskBtn.addEventListener('click', function() {
    modalContainer.style.display = 'flex';
    document.querySelector('#myForm').reset()
    submitEdit.style.display = 'none';
    submitBtn.style.display = 'flex';
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

submitBtn.addEventListener('click', submitAll);

function submitAll() {
    submitTasktoTaskList();
    clearContentSection();

    switch (page) {
        case 0:
            writeTaskAll();
        case 1:
            writeTaskToday();
        case 2:
            writeTaskWeek();
    }
    priorityStyling();
}

function submitTasktoTaskList() {
    let title = document.querySelector('#task-title').value;
    let description = document.querySelector('#task-description').value;
    let dueDate = document.querySelector('#task-dueDate').value;
    let priority = document.querySelector('#task-priority').value;

    if (title == '' || description == '' || dueDate == '' ) {
        console.log('Fail');
    } else {
        new Task(title, description, dueDate, priority);
        modalContainer.style.display = 'none';
    }
}

//export default, imports into tasks.js, ./functions/clearSection.js
function clearContentSection() {
    const tasksSection = document.querySelector('#table-taskList');
    while (tasksSection.children.length > 1) {
        tasksSection.children[1].remove();
    };
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
    page = '0';
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray);
    displayTask(sortedArrayByDateAsc);
    deleteTasks(writeTaskAll, sortedArrayByDateAsc);
    editTasks(writeTaskAll, sortedArrayByDateAsc);
};

//filter() library with today's date
function writeTaskToday() {
    page = '1';
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByDayAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfDay(), getEndOfDay());
    displayTask(sortedArrayByDayAsc);
    deleteTasks(writeTaskToday, sortedArrayByDayAsc);
    editTasks(writeTaskToday, sortedArrayByDayAsc);
};

//filter() library with week range
function writeTaskWeek() {
    page = '2';
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByWeekyAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfWeek(), getEndOfWeek());
    displayTask(sortedArrayByWeekyAsc);
    deleteTasks(writeTaskWeek, sortedArrayByWeekyAsc);
    editTasks(writeTaskWeek, sortedArrayByWeekyAsc);
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
            writeTask();
        })
    }
}

//adds eventlistener to return index of taskListArray with current list and edits
function editTasks(writeTask, editArray) {
    const editTaskBtn = document.querySelectorAll('.btn-edit');

    for (let i=0; i <= editTaskBtn.length-1; i++) {
        editTaskBtn[i].addEventListener('click', function() {
            submitEdit.style.display = 'flex';
            submitBtn.style.display = 'none';
            let editTask = taskListArray.map(function(task) { return task.title;}).indexOf(editArray[i].title);

            let title = document.querySelector('#task-title');
            let description = document.querySelector('#task-description');
            let dueDate = document.querySelector('#task-dueDate');
            let priority = document.querySelector('#task-priority');
            
            title.value = taskListArray[editTask].title;
            description.value = taskListArray[editTask].description;
            dueDate.value = taskListArray[editTask].dueDate;
            priority.value = taskListArray[editTask].priority;
            modalContainer.style.display = 'flex';

            submitEdit.addEventListener('click', function editClick() {
                if (title.value == '' || description.value == '' || dueDate.value == '' ) {
                    console.log('Fail');
                } else {
                    taskListArray[editTask].title = document.querySelector('#task-title').value;
                    taskListArray[editTask].description = document.querySelector('#task-description').value;
                    taskListArray[editTask].dueDate = document.querySelector('#task-dueDate').value;
                    taskListArray[editTask].priority = document.querySelector('#task-priority').value;
                    submitEdit.removeEventListener('click', editClick);
                    clearContentSection();
                    writeTask();
                    document.querySelector('#myForm').reset();
                    modalContainer.style.display = 'none';
                }
            })        
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

writeTaskAll();