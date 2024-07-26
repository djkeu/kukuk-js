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
        const currentMinutelyTime = now.toLocaleTimeString('it-IT', { minute: '2-digit', second: '2-digit' });

        for (let i = 1; i < 60; i++) {
            let minute = `${String(i).padStart(2, '0')}:00`;
            if (currentMinutelyTime === minute) {
                let times = i < 11 ? i : (i < 21 ? i - 10 : (i < 31 ? i - 20 : (i < 41 ? i - 30 : (i < 51 ? i - 40 : i - 50))));
                playKukuSound(times);
                console.log(`Minutely alarm sounded ${times} time(s) at: ${now.toLocaleTimeString()}.\n`);
            }
        }
    };

    const quarterlyAlarms = () => {
        const now = new Date();
        const currentQuarterlyTime = now.toLocaleTimeString('it-IT', { minute: '2-digit', second: '2-digit' });

        const alarms = ["15:00", "30:00", "45:00"];
        if (alarms.includes(currentQuarterlyTime)) {
            playKukuSound(1);
            console.log(`Quarterly alarm sounded 1 time at: ${now.toLocaleTimeString()}.\n`);
        }
    };

    const hourlyAlarms = () => {
        const now = new Date();
        const currentHourlyTime = now.toLocaleTimeString('it-IT');

        for (let i = 0; i < 24; i++) {
            let hour = `${String(i).padStart(2, '0')}:00:00`;
            if (hour === currentHourlyTime) {
                playKukuSound(i === 0 ? 12 : (i < 13 ? i : (i - 12)));
                console.log(`Hourly alarm sounded ${i === 0 ? 12 : (i < 13 ? i : (i - 12))} times at: ${now.toLocaleTimeString()}.\n`);
            }
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
        intervalId = setInterval(alarmsCallback, 1000 / 11);
    }

    alarmSelector.addEventListener('change', () => {
        if (!intervalId) {
            intervalId = setInterval(alarmsCallback, 1000 / 11);
        }
    });
});
