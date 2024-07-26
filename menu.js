// menu.js

// Function to load about information from about.json
async function loadAboutInfo() {
    const response = await fetch('about.json');
    const data = await response.json();
    const aboutSection = document.getElementById('about-section');
    
    // Assuming about.json contains an object with key-value pairs
    for (const key in data) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${data[key]}`;
        aboutSection.appendChild(p);
    }
}

// Call the function to load about information
loadAboutInfo();
