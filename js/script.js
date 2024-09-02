const btn = document.querySelector(".todo__add");
const input = document.querySelector(".todo__text");
const container = document.querySelector(".todo__items");

let taskArr = localStorage.getItem("taskArr")
  ? JSON.parse(localStorage.getItem("taskArr"))
  : [];
let i = localStorage.getItem("counter") ? +localStorage.getItem("counter") : 0;

const addTaskToTaskArr = (value) => {
  if (!value.trim()) {
    alert("Пустая строка!");
    return;
  }
  const date = new Date();
  taskArr.push({
    value: value,
    date: date.toLocaleString(),
    isCompleted: false,
    id: i,
  });
  i++;
  input.value = "";
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  localStorage.setItem("counter", i);
  renderTasks(taskArr);
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  addTaskToTaskArr(input.value);
});

const renderTasks = (taskArr) => {
  container.innerHTML = "";
  for (let task of taskArr) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");
    todoItem.dataset.id = task.id;

    const todoTask = document.createElement("span");
    todoTask.classList.add("todo__task");

    todoItem.append(todoTask);

    const todoValue = document.createElement("span");
    todoValue.innerText = task.value;

    todoTask.append(todoValue);
    todoTask.innerHTML += `<span class="todo__date">${task.date}</span>`;

    const btnComplete = document.createElement("span");
    btnComplete.classList.add("todo__action_complete", "todo__action");

    const btnDelete = document.createElement("span");
    btnDelete.classList.add("todo__action_delete", "todo__action");

    btnComplete.addEventListener("click", (event) => {
      todoItem.classList.toggle('completed');
      task.isCompleted = true;
      localStorage.setItem("taskArr", JSON.stringify(taskArr));
    })

    if (task.isCompleted) {
      todoItem.classList.add("completed");
    }


    todoItem.append(btnComplete);
    todoItem.append(btnDelete);

    container.append(todoItem);
  }
};

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__action_delete")) {
    const id = +event.target.closest(".todo__item").dataset.id;
    let newArr = [];
    for (let task of taskArr) {
      if (task.id !== id) {
        newArr.push(task);
      }
    }
    taskArr = newArr;
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
    renderTasks(taskArr);
  }
});

renderTasks(taskArr);
