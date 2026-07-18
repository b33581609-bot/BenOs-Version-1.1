/*
==================================================
File:
    config.js

Version:
    Ben OS v2.0

Purpose:
    Central configuration system for Ben OS.

Responsibilities:
    - Store application settings
    - Control system behavior
    - Provide shared configuration values

Dependencies:
    benos-core.js

Used By:
    Core Systems
    Modules
    User Settings

Future Improvements:
    - User editable settings panel
    - Theme manager
    - Cloud configuration sync
    - Multiple user profiles

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {


    if (typeof BenOS === "undefined") {


        console.error(
            "❌ BenOS Core must load before config.js"
        );


        return;


    }



    BenOS.config = {


        // Application Settings

        app: {

            name: "Ben OS",

            version: "2.0",

            theme: "default",

            debug: true

        },


        // Storage Settings

        storage: {

            autoSave: true,

            saveInterval: 30000

        },


        // Weather Settings

        weather: {

            refreshMinutes: 30,

            units: "metric"

        },


        // User Settings

        user: {

            defaultName: "Ben",

            language: "en"

        },


        // Development Settings

        developer: {

            mode: true,

            showLogs: true

        }


    };



    console.log(
        "🌲 BenOS Config Loaded"
    );


})();