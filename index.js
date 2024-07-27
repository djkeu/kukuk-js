document.addEventListener('DOMContentLoaded', () => {
    const kukuTime = document.getElementById('kuku_time');
    const kukuMessage = document.getElementById('kuku_message');
    const alarmSelector = document.getElementById('alarmSelector');
    let intervalId;
    let audio = new Audio('sounds/keukuk03.wav');
    let isPlaying = false;

    const updateTime = () => {
        const now = new Date();
        kukuTime.textContent = now.toLocaleTimeString();
    };

    const showKukuMessage = () => {
        return new Promise(resolve => {
            const kukuText = kukuMessage.querySelector('span');
            kukuText.style.visibility = 'visible';
            kukuText.style.opacity = '1'; // Show text
            setTimeout(() => {
                kukuText.style.visibility = 'hidden';
                kukuText.style.opacity = '0'; // Hide text
                resolve();
            }, 1000); // Show for 1000ms
        });
    };

    const playKukuSound = async (times = 1) => {
        if (isPlaying) return; // Avoid playing multiple sounds at the same time
        isPlaying = true;

        const kukuImage = kukuMessage.querySelector('.kuku-image');
        kukuImage.style.display = 'none'; // Hide image

        for (let i = 0; i < times; i++) {
            audio.currentTime = 0; // Reset the audio to the start
            await audio.play().catch(error => console.error('Audio playback failed:', error));
            await showKukuMessage(); // Show Kukuk message and wait for it to finish
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 200ms before the next Kukuk
        }

        kukuImage.style.display = 'block'; // Show image

        isPlaying = false;
    };

    const minutelyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0) {
            const lastDigit = currentMinute % 10;
            const times = lastDigit === 0 ? 10 : lastDigit;
            playKukuSound(times);
            console.log(`Minutely alarm sounded ${times} time(s) at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    const quarterlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();

        if (currentSecond === 0 && [15, 30, 45].includes(currentMinute)) {
            playKukuSound(1);
            console.log(`Quarterly alarm sounded 1 time at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    const hourlyAlarms = () => {
        const now = new Date();
        const currentSecond = now.getSeconds();
        const currentMinute = now.getMinutes();
        const currentHour = now.getHours();

        if (currentSecond === 0 && currentMinute === 0) {
            const times = (currentHour % 12) || 12;
            playKukuSound(times);
            console.log(`Hourly alarm sounded ${times} time(s) at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    const alarmsCallback = () => {
        const selectedAlarm = alarmSelector.value;

        if (selectedAlarm === 'minutely') {
            minutelyAlarms();
        } else if (selectedAlarm === 'quarterly_hourly') {
            quarterlyAlarms();
            hourlyAlarms();
        } else if (selectedAlarm === 'hourly') {
            hourlyAlarms();
        }
    };

    // Start updating the time immediately
    updateTime();
    setInterval(updateTime, 1000);

    // Check if a selector option is already chosen and start the alarms if so
    if (alarmSelector.value !== 'none') {
        intervalId = setInterval(alarmsCallback, 1000);
    }

    alarmSelector.addEventListener('change', () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(alarmsCallback, 1000);
    });
});
