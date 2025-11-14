const days = ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"];
let currentDay = "Isnin";
const daysContainer = document.getElementById("daysContainer");
const noteInput = document.getElementById("noteInput");

// Load app
function loadApp() {
    days.forEach(day => {
        const btn = document.createElement("button");
        btn.className = "day-card";
        btn.textContent = day;
        btn.onclick = () => switchDay(day);
        daysContainer.appendChild(btn);
    });

    switchDay(currentDay);
}

// Switch day
function switchDay(day) {
    currentDay = day;
    loadNoteForDay(day);
    updateActiveDay();
}

// Load note for specific day
function loadNoteForDay(day) {
    const saved = localStorage.getItem("subplanner_day_" + day) || "";
    noteInput.value = saved;
}

// Save note
function saveNote() {
    localStorage.setItem("subplanner_day_" + currentDay, noteInput.value);
    alert("Nota untuk " + currentDay + " disimpan!");
}

// Reset note
function resetNote() {
    if (confirm("Padam nota untuk " + currentDay + "?")) {
        localStorage.removeItem("subplanner_day_" + currentDay);
        noteInput.value = "";
    }
}

// Export all notes
function exportData() {
    const data = { days: {} };
    days.forEach(day => {
        data.days[day] = localStorage.getItem("subplanner_day_" + day) || "";
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subplanner-data.json";
    a.click();
}

// Import notes
function importData() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const data = JSON.parse(e.target.result);
        if (data.days) {
            days.forEach(day => {
                if (data.days[day] !== undefined) {
                    localStorage.setItem("subplanner_day_" + day, data.days[day]);
                }
            });
        }
        loadNoteForDay(currentDay);
        updateActiveDay();
        alert("Import selesai!");
    };
    reader.readAsText(file);
}

// Highlight active day
function updateActiveDay() {
    const buttons = daysContainer.querySelectorAll(".day-card");
    buttons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === currentDay) btn.classList.add("active");
    });
}

loadApp();
