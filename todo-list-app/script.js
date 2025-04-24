let tasks = [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.className = "task-text";
    if (task.completed) taskText.classList.add("completed");
    taskText.innerText = task.text;

    const metaInfo = document.createElement("div");
    metaInfo.className = "meta";
    metaInfo.innerHTML = `
      <span>📂 ${task.category}</span>
      <span>🚦 ${task.priority}</span>
    `;

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔ Complete";
    completeBtn.onclick = () => markComplete(index);

    const editBtn = document.createElement("button");
    editBtn.innerText = "✏ Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑 Delete";
    deleteBtn.onclick = () => deleteTask(index);

    buttonGroup.append(completeBtn, editBtn, deleteBtn);
    li.append(taskText, metaInfo, buttonGroup);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("categorySelect").value;
  const priority = document.getElementById("prioritySelect").value;
  const taskText = input.value.trim();

  if (taskText === "") return alert("Please enter a task!");

  tasks.push({
    text: taskText,
    completed: false,
    category,
    priority
  });

  input.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function markComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}
