async function fetchChecklist(cardId) {
    try {
        console.log(`Fetching checklist for card ID: ${cardId}`); // Debug log
        const response = await fetch(`/api/trello?cardId=${cardId}`);
        console.log(`Response status: ${response.status}`); // Debug log

        if (!response.ok) {
            throw new Error(`Failed to fetch checklist: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Checklist Data:', data); // Debug log

        const checklistItems = data[0]?.checkItems || [];
        const checklistContainer = document.getElementById('checklist');
        checklistContainer.innerHTML = '';

        checklistItems.forEach(item => {
            const listItem = document.createElement('li');
            const isChecked = item.state === 'complete';
            listItem.innerHTML = `
                <input type="checkbox" id="${item.id}" ${isChecked ? 'checked' : ''}>
                <label for="${item.id}">${item.name}</label>
            `;
            checklistContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching checklist:', error);
    }
}


document.addEventListener("DOMContentLoaded", loadChecklist);
    // Example card ID for fetching the checklist
const trelloCardId = 'we7nOhd5'; // Replace with a valid card ID
fetchChecklist(trelloCardId);