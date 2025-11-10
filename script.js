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

function filterTasks() {
    currentStatusFilter = document.getElementById('statusFilter').value;
    currentCategoryFilter = document.getElementById('categoryFilter').value;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    let filteredTasks = tasks.filter(task => {
        const statusMatch = currentStatusFilter === 'all' || task.status === currentStatusFilter;
        const categoryMatch = currentCategoryFilter === 'all' || task.category === currentCategoryFilter;
        return statusMatch && categoryMatch;
    });
    taskList.innerHTML = '';
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No tasks found. Add a task above!';
        emptyMessage.style.color = '#666';
        emptyMessage.style.fontStyle = 'italic';
        taskList.appendChild(emptyMessage);
        return;}

    filteredTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = `task-item ${task.status.toLowerCase().replace(' ', '-')}`;
        listItem.innerHTML = `
            <div>
                <strong>${task.name}</strong> 
                | Category: ${task.category} 
                | Due: ${task.deadline}
                | Status: 
                <select onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(listItem);
    });
}