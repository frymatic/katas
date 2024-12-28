async function fetchChecklist(cardId) {
    try {
        // Call the serverless function to fetch the checklist data
        const response = await fetch(`/api/trello?cardId=${cardId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch checklist: ${response.statusText}`);
        }

        // Parse the response data
        const data = await response.json();

        // Ensure there is at least one checklist in the response
        if (!data || data.length === 0) {
            throw new Error('No checklists found in the response.');
        }

        // Extract the first checklist's items
        const checklistItems = data[0].checkItems;

        // Populate the checklist in the HTML
        const checklistContainer = document.getElementById('checklist');
        checklistContainer.innerHTML = ''; // Clear any existing tasks

        checklistItems.forEach(item => {
            // Create a new list item for each checklist entry
            const listItem = document.createElement('li');
            const isChecked = item.state === 'complete'; // Determine if the task is completed

            listItem.innerHTML = `
                <input type="checkbox" id="${item.id}" ${isChecked ? 'checked' : ''}>
                <label for="${item.id}">${item.name}</label>
            `;
            checklistContainer.appendChild(listItem);
        });

        console.log('Checklist successfully populated.');
    } catch (error) {
        console.error('Error fetching or displaying checklist:', error);
    }
}

// Fetch the checklist when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const trelloCardId = 'we7nOhd5'; // Replace with your actual card ID
    fetchChecklist(trelloCardId);
});
