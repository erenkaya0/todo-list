document.getElementById('addTaskBtn').addEventListener('click', function() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    let li = document.createElement('li');
    li.textContent = taskText;


    li.addEventListener('click', function() {
        editTask(li, taskText);
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function() {
        li.remove();
        removeTaskFromStorage(taskText);
    });

    li.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';

    saveTaskToStorage(taskText);
});

function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (!Array.isArray(tasks)) {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = tasks.indexOf(oldTask);

    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask; 
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }
}

function editTask(li, oldTask) {
    let input = document.createElement('input');
    input.type = 'text';
    input.value = oldTask;
    input.classList.add('edit-input');

    li.textContent = ''; 
    li.appendChild(input);
    input.focus(); 

    function saveEdit() {
        let newTask = input.value.trim();
        if (newTask === '') {
            alert('Task cannot be empty!');
            return;
        }

        li.textContent = newTask; 

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeTaskFromStorage(newTask);
        });

        li.appendChild(deleteBtn);

        li.addEventListener('click', function() {
            editTask(li, newTask);
        });

        updateTaskInStorage(oldTask, newTask); 
    }


    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            saveEdit();
        }
    });

    input.addEventListener('blur', saveEdit);
}

window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
        let li = document.createElement('li');
        li.textContent = task;

        li.addEventListener('click', function() {
            editTask(li, task);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', function() {
            li.remove();
            removeTaskFromStorage(task);
        });

        li.appendChild(deleteBtn);
        document.getElementById('taskList').appendChild(li);
    });
};