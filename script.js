let tasks = [];
let currentStatusFilter = 'all';
let currentCategoryFilter = 'all';

window.onload = function() {
    loadTasks();
    renderTasks();
    checkOverDueTasks();
};

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function savedTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (!taskName || !taskCategory || !taskDeadline) {
        alert('Please fill in all fields');
        return;}
}

const newTask = {
    id: Date.now(), 
    name: taskName,
    category: taskCategory,
    deadline: taskDeadline,
    status: 'In Progress'
};

tasks.push(newTask)

savedTasks();
renderTasks();

