/*
==================================================
File:
    mission.js

Version:
    Ben OS v2.0

Purpose:
    Handles the Daily Mission dashboard,
    including greetings, mission progress,
    next task, and future motivation.

Responsibilities:
    - Display a time-of-day greeting
    - Display the next incomplete Planner task
    - Display a daily motivational message

Dependencies:
    BenOS Core
    BenOS.state.planner.today

Used By:
    Application UI

Future Improvements:
    - Storage integration
    - Replace direct Planner dependency with BenOS.events
    - Logger integration for mission updates

Last Updated:
    Ben OS v2.0
==================================================
*/


BenOS.modules.mission = {

    /*
    ------------------------------------
    Update Mission Task
    ------------------------------------
    */

    updateMissionTask() {

        const missionTask =
            document.getElementById("missionTask");

        if (!missionTask) return;

        if (!BenOS.state.planner.today) return;

        const nextTask =
        BenOS.state.planner.today.find(
            task => !task.completed
        );

        if (nextTask) {

            missionTask.innerHTML =
                `📋 Next Task:<br><strong>${nextTask.text}</strong>`;

        } else {

            missionTask.innerHTML =
                "🎉 <strong>All tasks completed!</strong>";

        }

    },


    /*
    ------------------------------------
    Update Mission Greeting
    ------------------------------------
    */

    updateMissionGreeting() {

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

    },


    /*
    ------------------------------------
    Update Mission Message
    ------------------------------------
    */

    updateMissionMessage() {

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

    },


    /*
    ------------------------------------
    Initialize Mission
    ------------------------------------
    */

    init() {

        this.updateMissionGreeting();
        this.updateMissionMessage();

        if (BenOS.logger) {

            BenOS.logger.info(
                "Mission module initialized"
            );

        }

    }


};


BenOS.events.on(
    "planner.updated",
    () => BenOS.modules.mission.updateMissionTask()
);


document.addEventListener("DOMContentLoaded", () => {

    BenOS.modules.mission.init();

});
