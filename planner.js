/* ===================================
   BenOS v1.1 - Planner Module
=================================== */

let todayTasks =
    JSON.parse(localStorage.getItem("benos_today_tasks")) || [];

let tomorrowTasks =
    JSON.parse(localStorage.getItem("benos_tomorrow_tasks")) || [];

function saveTasks() {

    localStorage.setItem(
        "benos_today_tasks",
        JSON.stringify(todayTasks)
    );

    localStorage.setItem(
        "benos_tomorrow_tasks",
        JSON.stringify(tomorrowTasks)
    );

}

function createTask(text = "", completed = false) {

    return {
        text,
        completed
    };

}

function renderTasks(containerId, taskArray) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    taskArray.forEach((task, index) => {

       const row = document.createElement("div");

row.className = task.completed
    ? "task-row completed"
    : "task-row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

    task.completed = checkbox.checked;

    if (task.completed) {

        row.classList.add("completed");

    } else {

        row.classList.remove("completed");

    }

    saveTasks();

    updateProgress();

    renderTasks(containerId, taskArray);

});

        const input = document.createElement("input");
        input.type = "text";
        input.value = task.text;
        input.placeholder = "New task...";

        input.addEventListener("input", () => {

            task.text = input.value;

            saveTasks();

        });
input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        if (containerId === "todayTasks") {

            addTodayTask();

        } else {

            addTomorrowTask();

        }

    }

});
        row.appendChild(checkbox);
row.appendChild(input);

const deleteButton = document.createElement("button");

deleteButton.textContent = "🗑";

deleteButton.className = "delete-task";

deleteButton.addEventListener("click", () => {

    taskArray.splice(index, 1);

    saveTasks();

    renderTasks(containerId, taskArray);

    updateProgress();

});

row.appendChild(deleteButton);

container.appendChild(row);

        container.appendChild(row);

    });

}

function addTodayTask() {

    todayTasks.push(createTask());

    saveTasks();

    renderTasks("todayTasks", todayTasks);

    updateProgress();

}

function addTomorrowTask() {

    tomorrowTasks.push(createTask());

    saveTasks();

    renderTasks("tomorrowTasks", tomorrowTasks);

}

function startMyDay() {

    todayTasks = [...tomorrowTasks];

    tomorrowTasks = [];

    saveTasks();

renderTasks("todayTasks", todayTasks);

renderTasks("tomorrowTasks", tomorrowTasks);

updateProgress();

}
function updateProgress() {

    const total = todayTasks.length;

    const completed = todayTasks.filter(
        task => task.completed
    ).length;

    const progress =
        document.getElementById("todayProgress");

    const text =
        document.getElementById("todayProgressText");

    if (progress) {

        progress.max = total || 1;

        progress.value = completed;

    }

    if (text) {

        text.textContent =
            `${completed} of ${total} tasks completed`;

    }

}

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("addTodayTask")
        .addEventListener("click", addTodayTask);

    document
        .getElementById("addTomorrowTask")
        .addEventListener("click", addTomorrowTask);

    document
        .getElementById("startDayButton")
        .addEventListener("click", startMyDay);

    renderTasks("todayTasks", todayTasks);

renderTasks("tomorrowTasks", tomorrowTasks);

updateProgress();

});