const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskItem = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(taskItem);
    renderTasks();

    taskInput.value = "";
  }
}

function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach((taskItem) => {
    const taskElement = createTaskElement(taskItem);
    taskList.appendChild(taskElement);
  });
}

function createTaskElement(taskItem) {
  const taskElement = document.createElement("li");
  taskElement.innerHTML = `
    <span class="task-text">${taskItem.text}</span> 
    <div class="task-actions">
      <i class="fas fa-check ${
        taskItem.completed ? "completed" : ""
      }" data-id="${taskItem.id}"></i>
      <i class="fas fa-trash" data-id="${taskItem.id}"></i>
    </div>
  `;

  taskElement.classList.add("task-item");
  if (taskItem.completed) {
    taskElement.classList.add("completed");
  }

  const checkIcon = taskElement.querySelector(".fa-check");
  checkIcon.addEventListener("click", toggleTask);

  const trashIcon = taskElement.querySelector(".fa-trash");
  trashIcon.addEventListener("click", deleteTask);

  return taskElement;
}

function toggleTask() {
  const taskId = Number(this.dataset.id);
  tasks = tasks.map((taskItem) => {
    if (taskItem.id === taskId) {
      return { ...taskItem, completed: !taskItem.completed };
    }
    return taskItem;
  });

  renderTasks();
}

function deleteTask() {
  const taskId = Number(this.dataset.id);
  tasks = tasks.filter((taskItem) => taskItem.id !== taskId);

  renderTasks();
}

function filterTasks(filter) {
  let filteredTasks = [];

  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "active") {
    filteredTasks = tasks.filter((taskItem) => !taskItem.completed);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((taskItem) => taskItem.completed);
  }

  renderTasks(filteredTasks);
}

function clearCompletedTasks() {
  tasks = tasks.filter((taskItem) => !taskItem.completed);

  renderTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

allBtn.addEventListener("click", function () {
  updateFilter("all");
});

activeBtn.addEventListener("click", function () {
  updateFilter("active");
});

completedBtn.addEventListener("click", function () {
  updateFilter("completed");
});

clearBtn.addEventListener("click", clearCompletedTasks);

function updateFilter(filter) {
  allBtn.classList.toggle("active", filter === "all");
  activeBtn.classList.toggle("active", filter === "active");
  completedBtn.classList.toggle("active", filter === "completed");

  filterTasks(filter);
}
