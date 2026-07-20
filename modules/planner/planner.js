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

    todayTasks: [],
    tomorrowTasks: [],


    /*
    ------------------------------------
    Initialize Planner
    ------------------------------------
    */

    init() {

        this.load();

        console.log("Loaded Today Tasks:", this.todayTasks);

        this.renderTasks(
            "todayTasks",
            this.todayTasks
        );

        this.renderTasks(
            "tomorrowTasks",
            this.tomorrowTasks
        );

console.log("Running updateProgress on startup");

                this.updateProgress();

        updateMissionTask();


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
    Add Today Task
    ------------------------------------
    */

    addTodayTask() {


        const task =
            this.createTask();


        this.todayTasks.push(task);


        this.save();


        this.renderTasks(
            "todayTasks",
            this.todayTasks
        );


        this.updateProgress();


        this.emitUpdate();


    },


    /*
    ------------------------------------
    Add Tomorrow Task
    ------------------------------------
    */

    addTomorrowTask() {


        const task =
            this.createTask();


        this.tomorrowTasks.push(task);


        this.save();


        this.renderTasks(
            "tomorrowTasks",
            this.tomorrowTasks
        );


        this.emitUpdate();


    },


    /*
    ------------------------------------
    Move Tomorrow → Today
    ------------------------------------
    */

    startMyDay() {


        this.todayTasks =
            [
                ...this.todayTasks,
                ...this.tomorrowTasks
            ];


        this.tomorrowTasks = [];


        this.save();


        this.renderTasks(
    "todayTasks",
    this.todayTasks
);

this.renderTasks(
    "tomorrowTasks",
    this.tomorrowTasks
);

this.updateProgress();

updateMissionTask();

        this.emitUpdate();


    },


    /*
    ------------------------------------
    Render Tasks
    ------------------------------------
    */

    renderTasks(containerId, tasks) {


        const container =
            document.getElementById(containerId);


        if (!container) {

            console.warn(
                "Planner container missing:",
                containerId
            );

            return;

        }


        container.innerHTML = "";


        tasks.forEach(task => {


            const row =
                document.createElement("div");


            row.className =
    task.completed ? "task-row completed" : "task-row";



            const checkbox =
                document.createElement("input");


            checkbox.type =
                "checkbox";


            checkbox.checked =
                task.completed;



            checkbox.addEventListener(
    "change",
    () => {

        task.completed =
            checkbox.checked;


        this.save();


        this.renderTasks(
            containerId,
            tasks
        );


        this.updateProgress();


        this.emitUpdate();

    }
);



            const input =
                document.createElement("input");


            input.value =
                task.text;


            input.addEventListener(
                "change",
                () => {


                    task.text =
                        input.value;


                    this.save();


                }
            );



            const deleteButton =
                document.createElement("button");


            deleteButton.textContent =
                "🗑";


            deleteButton.addEventListener(
                "click",
                () => {


                    const index =
                        tasks.indexOf(task);


                    tasks.splice(
                        index,
                        1
                    );


                    this.save();


                    this.renderTasks(
                        containerId,
                        tasks
                    );


                    this.updateProgress();


                    this.emitUpdate();


                }
            );



            row.appendChild(checkbox);

            row.appendChild(input);

            row.appendChild(deleteButton);



            container.appendChild(row);


        });


    },


    /*
    ------------------------------------
    Progress Tracking
    ------------------------------------
    */

    updateProgress() {


        const total =
            this.todayTasks.length;


        const completed =
            this.todayTasks.filter(
                task => task.completed
            ).length;



        const percent =
            total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );



        const progress =
            document.getElementById(
                "progressBar"
            );


        if(progress){

            progress.style.width =
                percent + "%";

        }



        return percent;


    },


    /*
    ------------------------------------
    Storage
    ------------------------------------
    */

    save() {


        if(!BenOS.storage)
            return;



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


        if(!BenOS.storage)
            return;



        this.todayTasks =
            BenOS.storage.load(
                "benos_today_tasks"
            ) || [];



        this.tomorrowTasks =
            BenOS.storage.load(
                "benos_tomorrow_tasks"
            ) || [];


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
                    this.todayTasks,

                    tomorrow:
                    this.tomorrowTasks
                }
            );


        }


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



// Auto initialize

document.addEventListener(
    "DOMContentLoaded",
    () => {

        BenOS.modules.planner.init();

    }
);


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

    updateMissionTask();

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

    updateMissionTask();

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
         
        updateMissionTask();
}

    
    

}

window.todayTasks = BenOS.modules.planner.todayTasks;

window.tomorrowTasks = BenOS.modules.planner.tomorrowTasks;

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