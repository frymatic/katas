async function fetchAndDisplayChecklists(cardId) {
    try {
        // Fetch all checklists for the card
        const response = await fetch(`/api/trello?cardId=${cardId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch checklists: ${response.statusText}`);
        }

        let checklists = await response.json();
        console.log('Checklists API Response (Unsorted):', checklists); // Debugging API response

        // Sort checklists by the `pos` property
        checklists = checklists.sort((a, b) => a.pos - b.pos);
        console.log('Checklists API Response (Sorted):', checklists);

        const container = document.getElementById('checklists-container');
        container.innerHTML = ''; // Clear any existing checklists

        // Process each checklist
        checklists.forEach(checklist => {
            // Create a section for each checklist
            const section = document.createElement('section');
            section.classList.add('checklist-section');

            // Add checklist title
            const title = document.createElement('h2');
            title.textContent = checklist.name; // Title of the checklist
            section.appendChild(title);

            // Add checklist items
            const list = document.createElement('ul');
            list.classList.add('checklist');

            checklist.checkItems
                .sort((a, b) => a.pos - b.pos) // Sort items within the checklist by `pos`
                .forEach(item => {
                    const listItem = document.createElement('li');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = item.id;
                    checkbox.checked = item.state === 'complete';

                    const label = document.createElement('label');
                    label.htmlFor = item.id;
                    label.textContent = item.name;

                    listItem.appendChild(checkbox);
                    listItem.appendChild(label);
                    list.appendChild(listItem);
                });

            section.appendChild(list);
            container.appendChild(section);
        });

        console.log('All checklists successfully displayed in the correct order.');
    } catch (error) {
        console.error('Error fetching or displaying checklists:', error);
    }
}

// Fetch the checklists when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const trelloCardId = 'we7nOhd5'; // Replace with your actual card ID
    fetchAndDisplayChecklists(trelloCardId);
});
