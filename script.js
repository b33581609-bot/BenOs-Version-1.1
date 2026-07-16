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

// ---------- Daily Teaching ----------

const teachings = [
    "🦅 Wisdom — Listen more than you speak today.",
    "🤝 Respect — Treat yourself and others with respect.",
    "❤️ Love — Let kindness guide your actions today.",
    "🛡️ Bravery — Do one thing you've been avoiding.",
    "🌿 Honesty — Be truthful with yourself today.",
    "🍃 Humility — Every person has something to teach you.",
    "✨ Truth — Live today as the person you want to become."
];

const today = new Date().getDay();

document.getElementById("teaching").textContent = teachings[today];

// ---------- Weather Placeholder ----------

document.getElementById("weather").textContent =
    "Weather integration coming soon...";

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