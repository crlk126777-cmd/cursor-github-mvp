const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const doneCount = document.querySelector("#done-count");
const clearDoneButton = document.querySelector("#clear-done");
const today = document.querySelector("#today");

const STORAGE_KEY = "simple-task-manager-tasks";
let tasks = loadTasks();

today.textContent = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric", month: "long", weekday: "long"
}).format(new Date());

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.replaceChildren();

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Отметить задачу «${task.text}» выполненной`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Удалить задачу «${task.text}»`);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((current) => current.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const completed = tasks.filter((task) => task.completed).length;
  taskCount.textContent = `Всего: ${tasks.length}`;
  doneCount.textContent = `Выполнено: ${completed}`;
  emptyState.hidden = tasks.length > 0;
  clearDoneButton.disabled = completed === 0;
  clearDoneButton.style.opacity = completed === 0 ? ".45" : "1";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false
  });
  saveTasks();
  renderTasks();
  form.reset();
  input.focus();
});

clearDoneButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
