// whatsnew.js

// Function to load about information from whatsnew.json
async function loadAboutInfo() {
    try {
        const response = await fetch('whatsnew.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const aboutSection = document.getElementById('whatsnew-section');
        
        // Assuming about.json contains an object with key-value pairs
        for (const key in data) {
            const keyElement = document.createElement('h4');
            keyElement.textContent = key;
            aboutSection.appendChild(keyElement);

            const valueElement = document.createElement('p');
            valueElement.textContent = data[key];
            aboutSection.appendChild(valueElement);
        }
    } catch (error) {
        console.error('Error fetching or parsing whatsnew.json:', error);
    }
}

// Call the function to load about information
loadAboutInfo();
