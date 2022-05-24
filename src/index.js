/**
To do list
================
--select multiple box
- MARK AS COMPLETE
- Add description field
 */

import { parseISO, compareAsc, format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import './styles/style.css';

var taskListArray = [];
var page;
const taskAllLink = document.querySelector('#task-all');
const taskTodayLink = document.querySelector('#task-today');
const taskWeekLink = document.querySelector('#task-week');

//Task constructor
function Task(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    taskListArray.push(this);
};

taskAllLink.addEventListener('click', () => { 
    page = 0;
    clearTaskListTable();
    showTaskAll();
});

taskTodayLink.addEventListener('click', () => {
    page = 1;
    clearTaskListTable();
    showTaskToday();
});

taskWeekLink.addEventListener('click', () => {
    page = 2;
    clearTaskListTable();
    showTaskWeek();
});

const task0 = new Task('Playing Games', 'Description - Playing Games', '2021-02-20', 'Urgent');
const task1 = new Task('Cooking', 'Description - Cooking', '2022-05-24', 'Medium');
const task2 = new Task('Driving', 'Description - Driving', '2022-05-27', 'Urgent');

//Modal display functionality
const addTaskBtn = document.querySelector('#btn-addTask');
const modalContainer = document.querySelector('#modal-container');
const modalForm = document.querySelector('#myForm');
const modalCloseBtn = document.querySelector('#close-myForm');
const modalSubmitBtn = document.querySelector('#task-add');
const modalEditBtn = document.querySelector('#task-edit');

addTaskBtn.addEventListener('click', function addTaskClick() {
    modalForm.reset();
    modalContainer.style.display = 'flex';
    modalEditBtn.style.display = 'none';
    modalSubmitBtn.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', function(){
    modalContainer.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == modalContainer) {
        modalContainer.style.display = 'none';
    }
});

modalSubmitBtn.addEventListener('click', function modalSubmitBtnClick() {
    submitTasks();
    clearTaskListTable();
    viewPage();
    priorityStyling();
});

function viewPage() {
    if (page == 0) {
        showTaskAll();
    } else if (page == 1) {
        showTaskToday();
    } else if (page == 2) {
        showTaskWeek();
    } else {
        showTaskAll();
    }
}

function showTaskAll() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray);
    appendTaskToTable(sortedArrayByDateAsc);
    priorityStyling();
    deleteTasks(showTaskAll, sortedArrayByDateAsc);
    editTasks(showTaskAll, sortedArrayByDateAsc);
};

function showTaskToday() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByDayAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfDay(), getEndOfDay());
    appendTaskToTable(sortedArrayByDayAsc);
    priorityStyling();
    deleteTasks(showTaskToday, sortedArrayByDayAsc);
    editTasks(showTaskToday, sortedArrayByDayAsc);
};

function showTaskWeek() {
    let sortedArrayByDateAsc = sortArrayDateAscending(taskListArray)
    let sortedArrayByWeekyAsc = filterArrayDate(sortedArrayByDateAsc, getStartOfWeek(), getEndOfWeek());
    appendTaskToTable(sortedArrayByWeekyAsc);
    priorityStyling();
    deleteTasks(showTaskWeek, sortedArrayByWeekyAsc);
    editTasks(showTaskWeek, sortedArrayByWeekyAsc);
}

function submitTasks() {
    let title = document.querySelector('#task-title').value;
    let description = document.querySelector('#task-description').value;
    let dueDate = document.querySelector('#task-dueDate').value;
    let priority = document.querySelector('#task-priority').value;

    if (title == '' || description == '' || dueDate == '' ) {
        console.log('Submit failed');
        alert('Please fill all fields.')
    } else {
        new Task(title, description, dueDate, priority);
        modalContainer.style.display = 'none';
    }
}

const tasksListTable = document.querySelector('#table-taskList');
function clearTaskListTable() {
    while (tasksListTable.children.length > 1) {
        tasksListTable.children[1].remove();
    };
};

function appendTaskToTable(tasks) {
    const taskListTableBody = document.createElement('tbody');
    tasksListTable.appendChild(taskListTableBody);

    tasks.forEach(function(task) {
        const taskListTableRow = document.createElement('tr');
        taskListTableRow.innerHTML = `<td>${task.title}</td>
                                        <td>${dateFormat(task.dueDate)}</td>
                                        <td id="td-priority">${task.priority}</td>
                                        <td><div class="td-edit"><button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button></div></td>
                                        <td><div class="td-trash"><button class="btn-trash"><i class="fa-solid fa-trash-can"></i></button></div></td>`
        taskListTableBody.appendChild(taskListTableRow);
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
        deleteTaskBtn[i].addEventListener('click', function deleteTaskBtnClick() {
            let deleteTask = taskListArray.map(function(task) { return task.title;}).indexOf(deleteArray[i].title);
            taskListArray.splice(deleteTask, 1);
            clearTaskListTable();
            writeTask();
        })
    }
}

//adds eventlistener to return index of taskListArray with current list and edits
function editTasks(writeTask, editArray) {
    const editTaskBtn = document.querySelectorAll('.btn-edit');

    for (let i=0; i <= editTaskBtn.length-1; i++) {
        editTaskBtn[i].addEventListener('click', function editTaskBtnClick() {
            modalEditBtn.style.display = 'flex';
            modalSubmitBtn.style.display = 'none';
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

            modalEditBtn.addEventListener('click', function modalEditBtnClick() {
                if (title.value == '' || description.value == '' || dueDate.value == '' ) {
                    console.log('Fail');
                } else {
                    taskListArray[editTask].title = document.querySelector('#task-title').value;
                    taskListArray[editTask].description = document.querySelector('#task-description').value;
                    taskListArray[editTask].dueDate = document.querySelector('#task-dueDate').value;
                    taskListArray[editTask].priority = document.querySelector('#task-priority').value;
                    modalEditBtn.removeEventListener('click', modalEditBtnClick);
                    clearTaskListTable();
                    writeTask();
                    modalForm.reset();
                    modalContainer.style.display = 'none';
                }
            })
        })
    }
}

//filters the array dates depending on what is passed
function filterArrayDate(arrayList, startDate, endDate) {
    return arrayList.filter((date) => {
        let arrayDate = parseISO(date.dueDate);
        return (arrayDate >= new Date(startDate) && arrayDate <= new Date(endDate));
    });
};

function sortArrayDateAscending(arrayList) {
    return ([...arrayList].sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))));
};

function dateFormat(date) {
    return format(parseISO(date), 'MMM / dd / yyyy');
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

showTaskAll();