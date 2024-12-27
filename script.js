async function fetchChecklist(cardId) {
    try {
        // Call your serverless function to fetch the checklist data
        const response = await fetch(`/api/trello?cardId=${cardId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch checklist: ${response.statusText}`);
        }

        const data = await response.json();

        // Extract the checklist items
        const checklistItems = data[0]?.checkItems || []; // Assuming you're working with the first checklist

        // Populate the checklist in the HTML
        const checklistContainer = document.getElementById('checklist');
        checklistContainer.innerHTML = ''; // Clear any existing tasks

        checklistItems.forEach(item => {
            // Create a new list item for each checklist entry
            const listItem = document.createElement('li');
            const isChecked = item.state === 'complete'; // Determine checkbox state

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