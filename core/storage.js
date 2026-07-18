/*
==================================================
File:
    storage.js

Version:
    Ben OS v2.0

Purpose:
    Provide a centralized storage system for Ben OS.

Responsibilities:
    - Save application data
    - Load application data
    - Remove stored data
    - Provide one storage interface for all modules

Dependencies:
    benos-core.js

Used By:
    Planner
    Mission
    Notes
    Calendar
    Future Modules

Future Improvements:
    - IndexedDB support
    - Cloud synchronization
    - Data encryption

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {

    if (typeof BenOS === "undefined") {

        console.error(
            "❌ BenOS Core must load before storage.js"
        );

        return;

    }


    BenOS.storage = {


        /*
        Save data
        */

        save(key, data) {

            try {

                localStorage.setItem(
                    key,
                    JSON.stringify(data)
                );


                return true;


            } catch (error) {


                console.error(
                    "Storage save failed:",
                    error
                );


                return false;

            }

        },


        /*
        Load data
        */

        load(key, defaultValue = null) {


            try {


                const data =
                    localStorage.getItem(key);


                if (data === null) {

                    return defaultValue;

                }


                return JSON.parse(data);


            } catch (error) {


                console.error(
                    "Storage load failed:",
                    error
                );


                return defaultValue;


            }


        },


        /*
        Remove stored data
        */

        remove(key) {


            localStorage.removeItem(key);


        },


        /*
        Clear all Ben OS storage
        */

        clear() {


            localStorage.clear();


        }


    };


    console.log(
        "🌲 BenOS Storage Loaded"
    );


})();