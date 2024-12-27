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

async function fetchChecklist(cardId) {
    // Call the serverless function to get Trello checklist data
    const response = await fetch(`/api/trello?cardId=${cardId}`);
    const data = await response.json();

    // Dynamically populate the checklist
    const checklist = document.getElementById('checklist');
    checklist.innerHTML = ''; // Clear existing tasks
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<input type="checkbox" id="${item.id}"> ${item.name}`;
        checklist.appendChild(listItem);
    });
}

// Example card ID for fetching the checklist
const trelloCardId = 'we7nOhd5'; // Replace with a valid card ID
fetchChecklist(trelloCardId);

document.addEventListener("DOMContentLoaded", loadChecklist);
