/*
==================================================
File:
    teachings.js

Version:
    Ben OS v2.0

Purpose:
    Displays the daily Seven Grandfather Teaching
    on the Ben OS dashboard.

Responsibilities:
    - Select today's teaching based on the day of the week
    - Render the teaching into the DOM
    - Provide teaching data to the rest of Ben OS

Dependencies:
    BenOS Core
    BenOS Constants

Used By:
    Application UI

Future Improvements:
    - Teaching history tracking
    - Random teaching mode
    - Multi-language support

Last Updated:
    Ben OS v2.0
==================================================
*/


BenOS.modules.teachings = {

    /*
    ------------------------------------
    Get Today's Teaching
    ------------------------------------
    */

    getTodayTeaching() {

        const teachings = BenOS.constants.teachings;

        const today = new Date().getDay();

        return teachings[today];

    },


    /*
    ------------------------------------
    Render Teaching
    ------------------------------------
    */

    render() {

        const teaching = document.getElementById("teaching");

        if (!teaching) {

            console.warn(
                "Teachings container missing: #teaching"
            );

            return;

        }

        teaching.textContent = this.getTodayTeaching();

    },


    /*
    ------------------------------------
    Initialize Teachings
    ------------------------------------
    */

    init() {

        this.render();

        if (BenOS.logger) {

            BenOS.logger.info(
                "Teachings module initialized"
            );

        }

    }


};
