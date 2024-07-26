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

// Add event listener for the mute button
document.getElementById('mute-button').addEventListener('click', function() {
    const button = this;
    if (button.textContent === '🔊') {
        button.textContent = '🔇';
        // Mute the sound (assuming there is an audio element with id 'audio')
        const audio = document.getElementById('audio');
        if (audio) {
            audio.muted = true;
        }
    } else {
        button.textContent = '🔊';
        // Unmute the sound
        const audio = document.getElementById('audio');
        if (audio) {
            audio.muted = false;
        }
    }
});

// Add event listener for the theme selector
document.getElementById('theme-selector').addEventListener('change', function() {
    const theme = this.value;
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        // Assuming a dark theme CSS file is available and linked in the head
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Add event listener for the kuku type selector
document.getElementById('kuku-selector').addEventListener('change', function() {
    const kukuType = this.value;
    // Implement the logic for changing the kuku type based on the selection
    console.log(`Kuku type selected: ${kukuType}`);
});
