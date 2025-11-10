let tasks = [];
let currentStatusFilter = 'all';
let currentCategoryFilter = 'all';

window.onload = function() {
    loadTasks();
    renderTasks();
    checkOverdueTasks();
};

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (!taskName || !taskCategory || !taskDeadline) {
        alert('Please fill in all fields');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        category: taskCategory,
        deadline: taskDeadline,
        status: 'In Progress'
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskDeadline').value = '';
}

function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
}

function checkOverdueTasks() {
    const today = new Date().toISOString().split('T')[0];
    
    tasks.forEach(task => {
        if (task.status !== 'Completed' && task.deadline < today) {
            task.status = 'Overdue';
        }
    });
    
    saveTasks();
    renderTasks();
}

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
        return;
    }

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
                    <option value="Overdue" ${task.status} === 'Overdue:  ? 'selected' : ''}>Overdue</option> 
                </select>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        taskList.appendChild(listItem);
    });
}