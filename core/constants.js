/*
==================================================
File:
    constants.js

Version:
    Ben OS v2.0

Purpose:
    Store permanent system values used
    throughout Ben OS.

Responsibilities:
    - Define system constants
    - Prevent duplicated values
    - Provide shared references

Dependencies:
    benos-core.js

Used By:
    Core Systems
    Modules
    Components

Future Improvements:
    - Localization support
    - Custom user constants
    - Theme constants

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {


    if (typeof BenOS === "undefined") {


        console.error(
            "❌ BenOS Core must load before constants.js"
        );


        return;


    }



    BenOS.constants = {


        app: {

            NAME: "Ben OS",

            SYSTEM: "Strong Roots",

            VERSION: "2.0"

        },


        modules: {


            CORE: "Core",

            PLANNER: "Planner",

            MISSION: "Mission",

            TEACHINGS: "Teachings",

            WEATHER: "Weather",

            CALENDAR: "Calendar",

            NOTES: "Notes"


        },


        teachings: [

            "🦅 Wisdom — Listen more than you speak today.",

            "🤝 Respect — Treat yourself and others with respect.",

            "❤️ Love — Let kindness guide your actions today.",

            "🛡️ Bravery — Do one thing you've been avoiding.",

            "🌿 Honesty — Be truthful with yourself today.",

            "🍃 Humility — Every person has something to teach you.",

            "✨ Truth — Live today as the person you want to become."

        ],


        status: {


            ACTIVE: "Active",

            COMPLETE: "Complete",

            PENDING: "Pending",

            IN_PROGRESS: "In Progress"


        }


    };



    console.log(
        "🌲 BenOS Constants Loaded"
    );


})();