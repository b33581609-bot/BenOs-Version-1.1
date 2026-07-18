/*
==================================================
File:
    logger.js

Version:
    Ben OS v2.0

Purpose:
    Provide a centralized logging system
    for Ben OS.

Responsibilities:
    - Record information messages
    - Record warnings
    - Record errors
    - Provide consistent debugging output

Dependencies:
    benos-core.js

Used By:
    Core Systems
    Modules
    Development Tools

Future Improvements:
    - Save logs to storage
    - Developer dashboard
    - Log filtering
    - Production mode controls

Last Updated:
    Ben OS v2.0
==================================================
*/


(function () {


    if (typeof BenOS === "undefined") {


        console.error(
            "❌ BenOS Core must load before logger.js"
        );


        return;


    }



    BenOS.logger = {


        info(message, data = null) {


            console.log(
                "🌲 INFO:",
                message,
                data || ""
            );


        },


        warn(message, data = null) {


            console.warn(
                "⚠️ WARNING:",
                message,
                data || ""
            );


        },


        error(message, data = null) {


            console.error(
                "❌ ERROR:",
                message,
                data || ""
            );


        },


        success(message, data = null) {


            console.log(
                "✅ SUCCESS:",
                message,
                data || ""
            );


        }


    };



    BenOS.logger.info(
        "Logger system loaded"
    );


})();