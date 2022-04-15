import clearSection from '../functions/clearSection.js';

export default function writeTaskAll() {
    clearSection();
    
    const tasksSection = document.querySelector('.tasks-section');

    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('style', 'width: 50px; height: 50px; background-color: red;')
    tasksSection.appendChild(taskDiv);
}