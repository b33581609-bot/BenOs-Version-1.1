/* ==================================================
   BenOS
   mission.js

   Purpose:
   Handles the Daily Mission dashboard,
   including greetings, mission progress,
   next task, and future motivation.

   Version:
   1.2
================================================== */

function updateMissionTask() {

    const missionTask =
        document.getElementById("missionTask");

    if (!missionTask) return;

    if (!BenOS.modules.planner.todayTasks) return;

    const nextTask =
    BenOS.modules.planner.todayTasks.find(
        task => !task.completed
    );

    if (nextTask) {

        missionTask.innerHTML =
            `📋 Next Task:<br><strong>${nextTask.text}</strong>`;

    } else {

        missionTask.innerHTML =
            "🎉 <strong>All tasks completed!</strong>";

    }

}

function updateMissionGreeting() {

    const greeting =
        document.getElementById("missionGreeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    let message = "";

    if (hour < 12) {

        message = "🌅 Good Morning, Ben";

    } else if (hour < 18) {

        message = "☀️ Good Afternoon, Ben";

    } else {

        message = "🌙 Good Evening, Ben";

    }

    greeting.textContent = message;

}

function updateMissionMessage() {

    const message =
        document.getElementById("missionMessage");

    if (!message) return;

    const messages = [

        "🌲 One step at a time.",

        "🌿 Progress beats perfection.",

        "🦅 Small actions build great futures.",

        "🔥 Finish one thing before starting another.",

        "🌱 Every task completed is a promise kept to yourself.",

        "💪 Consistency wins.",

        "✨ Today is another chance to grow."

    ];

    const day = new Date().getDay();

    message.textContent = messages[day];

}

document.addEventListener("DOMContentLoaded", () => {

    updateMissionGreeting();
    updateMissionMessage();

});