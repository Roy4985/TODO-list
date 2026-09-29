let tasks = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Finish JS assignment', done: true },
  { id: 3, title: 'Call mom', done: false },
];

const taskList = document.querySelector('#task-list');
const counter = document.querySelector('#counter');


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

renderTasks();