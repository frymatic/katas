function saveChecklist() {
    const tasks = document.querySelectorAll("input[type='checkbox']");
    const progress = Array.from(tasks).map(task => task.checked);
    localStorage.setItem("checklist", JSON.stringify(progress));
}

function loadChecklist() {
    const savedProgress = JSON.parse(localStorage.getItem("checklist"));
    if (savedProgress) {
        const tasks = document.querySelectorAll("input[type='checkbox']");
        tasks.forEach((task, index) => {
            task.checked = savedProgress[index];
        });
    }
}

function resetChecklist() {
    localStorage.removeItem("checklist");
    const tasks = document.querySelectorAll("input[type='checkbox']");
    tasks.forEach(task => (task.checked = false));
}

document.addEventListener("DOMContentLoaded", loadChecklist);
