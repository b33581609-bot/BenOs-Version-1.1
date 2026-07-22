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

        this.render();

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

        const container = document.getElementById("calendar");

        if (!container) {

            console.warn(
                "Calendar container missing: #calendar"
            );

            return;

        }

        container.innerHTML = "";

        const now = new Date();

        const today =
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0");

        const dateDisplay = document.createElement("div");

        dateDisplay.className = "calendar-date";

        dateDisplay.textContent = new Date().toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

        container.appendChild(dateDisplay);

        const todayEvents = this.events.filter(
            event => event.date === today
        );

        const todaySection = document.createElement("div");

        todaySection.className = "calendar-section";

        const todayHeading = document.createElement("h3");

        todayHeading.textContent = "Today's Events";

        todaySection.appendChild(todayHeading);

        if (todayEvents.length === 0) {

            const empty = document.createElement("p");

            empty.className = "calendar-empty";

            empty.textContent = "No events today.";

            todaySection.appendChild(empty);

        } else {

            todayEvents.forEach(event => {

                todaySection.appendChild(
                    this.renderEventRow(event, false)
                );

            });

        }

        container.appendChild(todaySection);

        const upcomingEvents = this.events
            .filter(event => event.date > today)
            .sort((a, b) => a.date.localeCompare(b.date));

        const upcomingSection = document.createElement("div");

        upcomingSection.className = "calendar-section";

        const upcomingHeading = document.createElement("h3");

        upcomingHeading.textContent = "Upcoming Events";

        upcomingSection.appendChild(upcomingHeading);

        if (upcomingEvents.length === 0) {

            const empty = document.createElement("p");

            empty.className = "calendar-empty";

            empty.textContent = "No upcoming events.";

            upcomingSection.appendChild(empty);

        } else {

            upcomingEvents.forEach(event => {

                upcomingSection.appendChild(
                    this.renderEventRow(event, true)
                );

            });

        }

        container.appendChild(upcomingSection);

        container.appendChild(this.renderForm());

    },


    /*
    ------------------------------------
    Render Event Row
    ------------------------------------
    */

    renderEventRow(event, showDate) {

        const row = document.createElement("div");

        row.className = "calendar-event-row";

        const info = document.createElement("div");

        info.className = "calendar-event-info";

        const title = document.createElement("span");

        title.className = "calendar-event-title";

        title.textContent = event.title;

        info.appendChild(title);

        if (showDate) {

            const date = document.createElement("span");

            date.className = "calendar-event-date";

            date.textContent = event.date;

            info.appendChild(date);

        }

        if (event.time) {

            const time = document.createElement("span");

            time.className = "calendar-event-time";

            time.textContent = event.time;

            info.appendChild(time);

        }

        if (event.notes) {

            const notes = document.createElement("span");

            notes.className = "calendar-event-notes";

            notes.textContent = event.notes;

            info.appendChild(notes);

        }

        row.appendChild(info);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";

        deleteButton.className = "calendar-delete-event";

        deleteButton.addEventListener("click", () => {

            this.deleteEvent(event.id);

            this.render();

        });

        row.appendChild(deleteButton);

        return row;

    },


    /*
    ------------------------------------
    Render Add Event Form
    ------------------------------------
    */

    renderForm() {

        const form = document.createElement("form");

        form.className = "calendar-form";

        const titleInput = document.createElement("input");

        titleInput.type = "text";

        titleInput.placeholder = "Event title";

        const dateInput = document.createElement("input");

        dateInput.type = "date";

        const timeInput = document.createElement("input");

        timeInput.type = "time";

        const notesInput = document.createElement("input");

        notesInput.type = "text";

        notesInput.placeholder = "Notes (optional)";

        const addButton = document.createElement("button");

        addButton.type = "submit";

        addButton.textContent = "+ Add Event";

        form.appendChild(titleInput);

        form.appendChild(dateInput);

        form.appendChild(timeInput);

        form.appendChild(notesInput);

        form.appendChild(addButton);

        form.addEventListener("submit", event => {

            event.preventDefault();

            const title = titleInput.value.trim();

            const date = dateInput.value;

            if (!title || !date) {

                return;

            }

            const newEvent = this.createEvent(
                title,
                date,
                timeInput.value,
                notesInput.value.trim()
            );

            this.addEvent(newEvent);

            this.render();

        });

        return form;

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


document.addEventListener("DOMContentLoaded", () => {

    BenOS.modules.calendar.init();

});
