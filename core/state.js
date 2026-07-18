/*
==========================================
Ben OS State Manager

Purpose:
    Single source of truth for application data.

Responsibilities:
    - Store application state
    - Expose shared data to modules
    - Prepare data for storage layer

Dependencies:
    benos-core.js

Used By:
    Planner
    Mission
    Calendar
    Weather
    Notes
==========================================
*/

(function () {

    if (typeof BenOS === "undefined") {
        console.error("❌ BenOS Core must load before state.js");
        return;
    }

    BenOS.state = {

        // -------------------------
        // Application
        // -------------------------

        app: {
            initialized: false,
            currentPage: "dashboard",
            currentTheme: "default",
            lastOpened: null
        },

        // -------------------------
        // User
        // -------------------------

        user: {
            name: "Ben",
            version: "2.0",
            status: "Growing"
        },

        // -------------------------
        // Planner
        // -------------------------

        planner: {
            today: [],
            tomorrow: [],
            completedToday: 0
        },

        // -------------------------
        // Mission
        // -------------------------

        mission: {
            current: "",
            progress: 0
        },

        // -------------------------
        // Notes
        // -------------------------

        notes: {
            text: ""
        },

        // -------------------------
        // Weather
        // -------------------------

        weather: {
            city: "",
            temperature: "",
            condition: "",
            updated: null
        },

        // -------------------------
        // Calendar
        // -------------------------

        calendar: {
            selectedDate: null,
            events: []
        },

        // -------------------------
        // Seven Grandfather Teachings
        // -------------------------

        teachings: {
            today: "",
            history: []
        },

        // -------------------------
        // Weekly Progress
        // -------------------------

        progress: {

            jobApplications: 0,

            learning: 0,

            tiktoks: 0,

            cnc: 0

        }

    };

    console.log("🌲 BenOS State Loaded");

})();