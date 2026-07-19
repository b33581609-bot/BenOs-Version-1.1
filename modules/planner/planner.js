/*
==================================================
Module:
    Planner

Version:
    Ben OS v2.0

Purpose:
    Manage daily and future tasks.

Dependencies:
    BenOS Core
    State
    Storage
    Events
    Logger

Responsibilities:
    - Create tasks
    - Display tasks
    - Track completion
    - Save planner data

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {


    if (typeof BenOS === "undefined") {

        console.error(
            "❌ BenOS Core required for Planner"
        );

        return;

    }


    BenOS.modules = BenOS.modules || {};


    BenOS.modules.planner = {


    todayTasks: [],


tomorrowTasks: [],

createTask(text = "", completed = false) {
    return {
        text,
        completed
    };
},
    init() {

    this.load();

    renderTasks(
        "todayTasks",
        this.todayTasks
    );

    renderTasks(
        "tomorrowTasks",
        this.tomorrowTasks
    );

    updateProgress();


    BenOS.logger.info(
        "Planner module initialized"
    );

},



    save() {

        BenOS.storage.save(
            "benos_today_tasks",
            this.todayTasks
        );


        BenOS.storage.save(
            "benos_tomorrow_tasks",
            this.tomorrowTasks
        );

    },



        load() {

        this.todayTasks =
    BenOS.storage.load(
        "benos_today_tasks",
        []
    );


if (!Array.isArray(this.todayTasks)) {

    this.todayTasks = [];

}


        this.tomorrowTasks =
    BenOS.storage.load(
        "benos_tomorrow_tasks",
        []
    );


if (!Array.isArray(this.tomorrowTasks)) {

    this.tomorrowTasks = [];

}

    }


};


})();


function saveTasks() {
    if (BenOS && BenOS.modules && BenOS.modules.planner) {
        BenOS.modules.planner.save();
    }
}

function renderTasks(containerId, taskArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    taskArray.forEach((task, index) => {
        const row = document.createElement("div");
        row.className = task.completed ? "task-row completed" : "task-row";

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

    });
}

function addTodayTask() {

    BenOS.modules.planner.todayTasks.push(
        BenOS.modules.planner.createTask()
    );

    saveTasks();

    renderTasks(
        "todayTasks",
        BenOS.modules.planner.todayTasks
    );

    updateProgress();

}

function addTomorrowTask() {

    BenOS.modules.planner.tomorrowTasks.push(
        BenOS.modules.planner.createTask()
    );

    saveTasks();

    renderTasks(
        "tomorrowTasks",
        BenOS.modules.planner.tomorrowTasks
    );

}

function startMyDay() {

    BenOS.modules.planner.todayTasks =
        [...BenOS.modules.planner.tomorrowTasks];

    BenOS.modules.planner.tomorrowTasks = [];

    saveTasks();

    renderTasks(
        "todayTasks",
        BenOS.modules.planner.todayTasks
    );

    renderTasks(
        "tomorrowTasks",
        BenOS.modules.planner.tomorrowTasks
    );

    updateProgress();

}
function updateProgress() {

    const todayTasks =
        BenOS.modules.planner.todayTasks;

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

    // 🌲 Daily Mission Progress
    const missionBar =
        document.getElementById("missionProgressBar");

    const missionText =
        document.getElementById("missionProgress");

    if (missionBar) {

        missionBar.max = total || 1;

        missionBar.value = completed;

    }

    if (missionText) {

        missionText.textContent =
            `${completed} of ${total} tasks completed`;

    }

    updateMissionTask();

}

window.todayTasks = BenOS.modules.planner.todayTasks;

window.tomorrowTasks = BenOS.modules.planner.tomorrowTasks;

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
renderTasks(
    "todayTasks",
    BenOS.modules.planner.todayTasks
);


renderTasks(
    "tomorrowTasks",
    BenOS.modules.planner.tomorrowTasks
);

updateProgress();



});