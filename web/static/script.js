const API_URL = "http://127.0.0.1:8000/tasks/";

document.addEventListener("DOMContentLoaded", () => { loadTasks(); });

const addTaskBtn = document.getElementById("add-task-btn");
const taskModal = document.getElementById("task-modal");
const closeBtn = document.getElementsByClassName("close-btn")[0];
const taskForm = document.getElementById("task-form");
const filterButton = document.getElementById("filter-button");
const filterStatus = document.getElementById("filter-status");

filterButton.addEventListener('click', () => {
  const status = document.getElementById('filter-status').value;

  loadTasks(status);
});


addTaskBtn.onclick = function() {
  openModal();
};

closeBtn.onclick = function() {
  closeModal();
};

window.onclick = function(event) {
  if (event.target == taskModal) {
    closeModal();
  }
};

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskId = document.getElementById("task-id").value;
  if (taskId) {
    updateTask(taskId);
  } else {
    createTask();
  }
});

async function loadTasks(status = "") {
  const tasksList = document.getElementById("tasks-container");
  tasksList.innerHTML = "";

  url = API_URL;

  if (status != "" && status != "all") {
    url += `?status=${status}`;
  }
  const response = await fetch(url);

  const tasks = await response.json();

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.status}
        <p>${task.description || "Sem descrição"}</p>
      </div>
      <div class="task-actions">
        <button class="edit-btn" onclick="openEditModal(${task.id}, '${task.title}', '${task.description}', '${task.status}')">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    tasksList.appendChild(li);
  });
}

async function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, status }),
  });
  
  if (response.ok) {
    closeModal();
    loadTasks();
  }
}

async function deleteTask(id) {
  await fetch(`${API_URL}${id}`, { method: "DELETE" });
  loadTasks();
}

async function updateTask(id) {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, status }),
  });
  closeModal();
  loadTasks();
}

function openModal() {
  document.getElementById("task-id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("status").value = "pendente";
  document.getElementById("modal-title").innerText = "Add Task";
  taskModal.style.display = "block";
}

function closeModal() {
  taskModal.style.display = "none";
}

function openEditModal(id, title, description, status) {
  document.getElementById("task-id").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("status").value = status;
  document.getElementById("modal-title").innerText = "Edit Task";
  taskModal.style.display = "block";
}