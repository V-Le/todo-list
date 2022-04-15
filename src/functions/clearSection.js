export default function clearSection() {
    const tasksSection = document.querySelector('.tasks-section');

    while (tasksSection.children.length > 0) {
        tasksSection.children[0].remove();
    }
}