// menu.js

// Function to load about information from about.json
async function loadAboutInfo() {
    try {
        const response = await fetch('about.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const aboutSection = document.getElementById('about-section');
        
        // Assuming about.json contains an object with key-value pairs
        for (const key in data) {
            const p = document.createElement('p');
            p.textContent = `${key}: ${data[key]}`;
            aboutSection.appendChild(p);
        }
    } catch (error) {
        console.error('Error fetching or parsing about.json:', error);
    }
}

// Call the function to load about information
loadAboutInfo();

