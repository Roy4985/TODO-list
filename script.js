let tasks = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Finish JS assignment', done: true },
  { id: 3, title: 'Call mom', done: false },
];


const taskList = document.querySelector('#task-list');
const counter = document.querySelector('#counter');
const taskForm = document.querySelector('#task-form');    
const taskInput = document.querySelector('#task-input');   
const errorMessage = document.querySelector('#error');   


function addTask(title) {
  const newTask = {
    id: Date.now(),
    title: title,
    done: false,
  };
  tasks = [...tasks, newTask];
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}


function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
  if (task.done) {
    li.classList.add('done');
  }

  const title = document.createElement('span');
  title.classList.add('title');
  title.textContent = task.title;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = '✕';

  li.append(title, deleteButton);
  return li;
}


function renderTasks() {
  taskList.innerHTML = '';

  tasks
    .map(createTaskElement)
    .forEach(li => taskList.append(li));

  renderCounter();
}


function renderCounter() {
  if (tasks.length === 0) {
    counter.textContent = 'No tasks yet';
    return;
  }
  const doneCount = tasks.filter(task => task.done).length;
  counter.textContent = `${doneCount} of ${tasks.length} done`;
}

function showError(message) {
  errorMessage.textContent = message;
  taskInput.classList.add('invalid');
}

function clearError() {
  errorMessage.textContent = '';
  taskInput.classList.remove('invalid');
}

function handleSubmit(event) {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (title === '') {
    showError('Please type a task before adding it.');
    taskInput.focus();
    return;
  }

  clearError();
  addTask(title);
  taskInput.value = '';
  taskInput.focus();
}

function handleListClick(event) {
  const li = event.target.closest('li');
  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (event.target.closest('.delete')) {
    deleteTask(id);
  } else {
    toggleTask(id);
  }
}

taskForm.addEventListener('submit', handleSubmit);
taskInput.addEventListener('input', clearError);
taskList.addEventListener('click', handleListClick);


renderTasks();