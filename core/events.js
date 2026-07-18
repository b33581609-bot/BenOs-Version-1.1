/*
==================================================
File:
    events.js

Version:
    Ben OS v2.0

Purpose:
    Provide a centralized communication system
    between Ben OS modules.

Responsibilities:
    - Create events
    - Listen for events
    - Trigger event responses
    - Keep modules independent

Dependencies:
    benos-core.js

Used By:
    Planner
    Mission
    Calendar
    Weather
    Future Modules

Future Improvements:
    - Event history tracking
    - Debug event viewer
    - Async event support

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {


    if (typeof BenOS === "undefined") {


        console.error(
            "❌ BenOS Core must load before events.js"
        );


        return;


    }


    const listeners = {};



    BenOS.events = {



        /*
        Subscribe to an event
        */

        on(eventName, callback) {


            if (!listeners[eventName]) {

                listeners[eventName] = [];

            }


            listeners[eventName].push(callback);


        },



        /*
        Trigger an event
        */

        emit(eventName, data = null) {


            if (!listeners[eventName]) {

                return;

            }


            listeners[eventName].forEach(
                callback => {

                    callback(data);

                }
            );


        },



        /*
        Remove event listener
        */

        off(eventName, callback) {


            if (!listeners[eventName]) {

                return;

            }


            listeners[eventName] =
                listeners[eventName]
                .filter(
                    listener =>
                    listener !== callback
                );


        },


        /*
        View active events
        */

        list() {


            return Object.keys(listeners);


        }


    };


    console.log(
        "🌲 BenOS Events Loaded"
    );


})();