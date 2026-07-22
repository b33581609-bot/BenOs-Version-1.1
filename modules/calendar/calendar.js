/*
==================================================
File:
    calendar.js

Version:
    Ben OS v2.0

Purpose:
    Provides date-based event management for the
    Ben OS Calendar module.

Responsibilities:
    - Define the Calendar module namespace
    - Hold calendar event data
    - Provide placeholders for future event
      creation, storage, and rendering logic

Dependencies:
    BenOS Core

Used By:
    Application UI (future phase)

Future Improvements:
    - Event creation and deletion
    - Event persistence via BenOS Storage
    - Calendar UI rendering
    - Monthly calendar grid
    - Planner integration

Last Updated:
    Ben OS v2.0
==================================================
*/


BenOS.modules.calendar = {

    events: [],


    /*
    ------------------------------------
    Initialize Calendar
    ------------------------------------
    */

    init() {

        this.load();

        if (BenOS.logger) {

            BenOS.logger.info(
                "Calendar module initialized"
            );

        }

    },


    /*
    ------------------------------------
    Create Event
    ------------------------------------
    */

    createEvent(title, date, time, notes) {

        return {

            id: Date.now(),

            title: title,

            date: date,

            time: time,

            notes: notes

        };

    },


    /*
    ------------------------------------
    Add Event
    ------------------------------------
    */

    addEvent(event) {

        this.events.push(event);

        this.save();

    },


    /*
    ------------------------------------
    Delete Event
    ------------------------------------
    */

    deleteEvent(id) {

        const index = this.events.findIndex(
            event => event.id === id
        );

        if (index === -1) {

            return;

        }

        this.events.splice(index, 1);

        this.save();

    },


    /*
    ------------------------------------
    Render Calendar
    ------------------------------------
    */

    render() {

        // Future phase: render events into the #calendar container

    },


    /*
    ------------------------------------
    Storage
    ------------------------------------
    */

    save() {

        BenOS.storage.save(
            "benos_calendar_events",
            this.events
        );

    },


    load() {

        this.events = BenOS.storage.load(
            "benos_calendar_events",
            []
        );

        if (!Array.isArray(this.events)) {

            this.events = [];

        }

    }


};
