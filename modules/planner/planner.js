/*
==================================================
 BEN OS v2.0 - PLANNER MODULE
 Strong Roots Architecture

 Purpose:
 Manage daily tasks, future tasks, completion,
 storage, and planner events.

 Dependencies:
 BenOS Core
 BenOS Storage
 BenOS Events
 BenOS Logger

==================================================
*/


BenOS.modules.planner = {


    /*
    ------------------------------------
    Initialize Planner
    ------------------------------------
    */

    init() {

        this.load();

        console.log("Loaded Today Tasks:", BenOS.state.planner.today);

        renderTasks(
            "todayTasks",
            BenOS.state.planner.today
        );

        renderTasks(
            "tomorrowTasks",
            BenOS.state.planner.tomorrow
        );

console.log("Running updateProgress on startup");

                updateProgress();


        if (BenOS.logger) {

            BenOS.logger.info(
                "Planner module initialized"
            );

        }


    },


    /*
    ------------------------------------
    Create Task
    ------------------------------------
    */

    createTask(text = "") {

        return {

            id: Date.now(),

            text: text,

            completed: false,

            created:
                new Date().toISOString()

        };

    },


    /*
    ------------------------------------
    Storage
    ------------------------------------
    */

    save() {

        BenOS.storage.save(
            "benos_today_tasks",
            BenOS.state.planner.today
        );


        BenOS.storage.save(
            "benos_tomorrow_tasks",
            BenOS.state.planner.tomorrow
        );

    },


    load() {

        BenOS.state.planner.today =
            BenOS.storage.load(
                "benos_today_tasks",
                []
            );


        if (!Array.isArray(BenOS.state.planner.today)) {

            BenOS.state.planner.today = [];

        }


        BenOS.state.planner.tomorrow =
            BenOS.storage.load(
                "benos_tomorrow_tasks",
                []
            );


        if (!Array.isArray(BenOS.state.planner.tomorrow)) {

            BenOS.state.planner.tomorrow = [];

        }

    },


    /*
    ------------------------------------
    Events
    ------------------------------------
    */

    emitUpdate(){


        if(BenOS.events){


            BenOS.events.emit(
                "planner.updated",
                {
                    today:
                    BenOS.state.planner.today,

                    tomorrow:
                    BenOS.state.planner.tomorrow
                }
            );


        }


    }


};


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

    renderTasks(containerId, taskArray);

    console.log("Checkbox update running");

    updateProgress();

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

    BenOS.state.planner.today.push(
        BenOS.modules.planner.createTask()
    );

    saveTasks();

    renderTasks(
        "todayTasks",
        BenOS.state.planner.today
    );

        updateProgress();

}

function addTomorrowTask() {

    BenOS.state.planner.tomorrow.push(
        BenOS.modules.planner.createTask()
    );

    saveTasks();

    renderTasks(
        "tomorrowTasks",
        BenOS.state.planner.tomorrow
    );

}

function startMyDay() {

    BenOS.state.planner.today.push(
        ...BenOS.state.planner.tomorrow
    );

    BenOS.state.planner.tomorrow.length = 0;

    saveTasks();

    renderTasks(
        "todayTasks",
        BenOS.state.planner.today
    );

    renderTasks(
        "tomorrowTasks",
        BenOS.state.planner.tomorrow
    );

    updateProgress();

}
function updateProgress() {

    const todayTasks =
        BenOS.state.planner.today;

    const total = todayTasks.length;

    const completed = todayTasks.filter(
        task => task.completed
    ).length;

    const progress =
        document.getElementById("todayProgress");

    const text =
        document.getElementById("todayProgressText");

    console.log("Progress elements:", progress, text);

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
    if (total > 0) {

        BenOS.modules.planner.emitUpdate();
}




}

document.addEventListener("DOMContentLoaded", () => {

    BenOS.modules.planner.init();

    document
        .getElementById("addTodayTask")
        .addEventListener("click", addTodayTask);

    document
        .getElementById("addTomorrowTask")
        .addEventListener("click", addTomorrowTask);

    document
        .getElementById("startDayButton")
        .addEventListener("click", startMyDay);

});
