async function fetchAndDisplayChecklists(cardId) {
    try {
        const token = localStorage.getItem('trelloToken'); // Retrieve token from local storage

        if (!token) {
            // If no token exists, redirect to Trello's authentication
            const authUrl = `https://trello.com/1/authorize?expiration=1hour&name=YourAppName&scope=read,write&response_type=token&key=YOUR_TRELLO_API_KEY`;
            alert('You need to log in to Trello.');
            window.location.href = authUrl;
            return;
        }

        const response = await fetch(`/api/trello?cardId=${cardId}&token=${token}`);
        if (!response.ok) {
            const errorData = await response.json();

            // Handle token expiration or missing token
            if (response.status === 401 && errorData.authUrl) {
                alert('Your session has expired. Please log in again.');
                window.location.href = errorData.authUrl;
                return;
            }

            throw new Error(`Failed to fetch checklists: ${errorData.error || response.statusText}`);
        }

        let checklists = await response.json();
        console.log('Checklists API Response (Unsorted):', checklists); // Debugging API response

        // Sort checklists by the `pos` property
        checklists = checklists.sort((a, b) => a.pos - b.pos);

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
    // Check for a token in the URL hash
    const urlParams = new URLSearchParams(window.location.hash.substring(1)); // Get URL hash parameters
    const token = urlParams.get('token');

    if (token) {
        localStorage.setItem('trelloToken', token); // Save token to localStorage
        alert('Login successful!');
        window.location.href = '/'; // Redirect to main page
    } else {
        // Continue with the app if no token is found in the URL
        const trelloCardId = 'rLxcVYX4'; // Replace with your actual card ID
        fetchAndDisplayChecklists(trelloCardId);
    }
});
