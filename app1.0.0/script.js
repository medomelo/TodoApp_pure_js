const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// زر Clear Completed
const clearCompletedBtn = document.createElement("button");
clearCompletedBtn.textContent = "Clear Completed Tasks";
clearCompletedBtn.className = 'clearbtn';
taskList.parentElement.appendChild(clearCompletedBtn);

// استرجاع المهام من localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.done);
  });
});

// إضافة المهمة
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText, false);
    saveTasks();
    taskInput.value = "";
  }
});

// إضافة مهمة إلى الواجهة
function addTaskToDOM(text, done) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "❌";
  deleteBtn.style.position = "absolute";
  deleteBtn.style.right = "10px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// حفظ المهام في localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// حذف المهام المنتهية
clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll("li.done").forEach(task => task.remove());
  saveTasks();
});
