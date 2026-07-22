/* ===================================
   BenOS v1.1 - Strong Roots
   Script
=================================== */

// ---------- Live Clock & Date ----------

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();

// ---------- Weather Placeholder ----------

// ---------- Auto Save ----------

function enableAutoSave(id, key) {

    const element = document.getElementById(id);

    if (!element) return;

    element.value = localStorage.getItem(key) || "";

    element.addEventListener("input", () => {

        localStorage.setItem(key, element.value);

    });

}
enableAutoSave("notes", "benos_notes");

// ===============================
// Welcome Dashboard
// ===============================

function updateGreeting() {

    const greeting = document.getElementById("greeting");
    const date = document.getElementById("todayDate");
    const message = document.getElementById("dailyMessage");

    if (!greeting || !date || !message) return;

    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
        greeting.textContent = "🌅 Good Morning, Ben";
    } else if (hour < 18) {
        greeting.textContent = "☀️ Good Afternoon, Ben";
    } else {
        greeting.textContent = "🌙 Good Evening, Ben";
    }

    date.textContent = now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const messages = [
        "One task at a time. Progress beats perfection.",
        "Small steps every day build great things.",
        "Today's effort creates tomorrow's opportunities.",
        "Stay focused. Stay consistent.",
        "Do the next right thing.",
        "Progress, not perfection."
    ];

    const day = now.getDay();

    message.textContent = messages[day];
}

document.addEventListener("DOMContentLoaded", updateGreeting);

function updateCoreStatus() {

    const footer = document.getElementById("systemFooter");

    if (!footer) return;

    if (typeof BenOS !== "undefined") {

        footer.textContent =
        `🌲 BenOS v${BenOS.version.number} — ${BenOS.identity.system}`;

    }

}

document.addEventListener(
"DOMContentLoaded",
updateCoreStatus
);