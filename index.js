document.addEventListener('DOMContentLoaded', () => {
    const kukuTime = document.getElementById('kuku_time');
    const startButton = document.getElementById('startButton');
    const alarmSelector = document.getElementById('alarmSelector');
    let intervalId;
    let audio = new Audio('sounds/keukuk03.wav');
    let isPlaying = false;

    const updateTime = () => {
        const now = new Date();
        kukuTime.textContent = now.toLocaleTimeString();
    };

    const playKukuSound = async (times = 1) => {
        if (isPlaying) return; // Avoid playing multiple sounds at the same time
        isPlaying = true;

        for (let i = 0; i < times; i++) {
            audio.currentTime = 0; // Reset the audio to the start
            await audio.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
            await new Promise(resolve => setTimeout(resolve, 1100)); // Wait for 1.1 seconds
        }

        isPlaying = false;
    };

    const minutelyAlarms = () => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString('it-IT');
        const currentMinutelyTime = now.toLocaleTimeString('it-IT', { minute: '2-digit', second: '2-digit' });

        for (let i = 1; i < 60; i++) {
            let times = i < 11 ? i : (i < 21 ? i - 10 : (i < 31 ? i - 20 : (i < 41 ? i - 30 : (i < 51 ? i - 40 : i - 50))));
            let minute = `${String(i).padStart(2, '0')}:00`;

            if (currentMinutelyTime === minute) {
                playKukuSound(times);
                console.log(`Minutely alarms sounded ${times} time(s) at: ${currentTime}.\n`);
            }
        }
    };

    const quarterlyAlarms = () => {
        const now = new Date();
        const currentQuarterlyTime = now.toLocaleTimeString('it-IT', { minute: '2-digit', second: '2-digit' });
        const currentLoggedTime = now.toLocaleTimeString();

        const alarms = ["15:00", "30:00", "45:00"];

        if (alarms.includes(currentQuarterlyTime)) {
            playKukuSound(1);
            console.log(`Quarterly alarm sounded 1 time at: ${currentLoggedTime}.\n`);
        }
    };

    const hourlyAlarms = () => {
        const now = new Date();
        const currentHourlyTime = now.toLocaleTimeString('it-IT');

        for (let i = 0; i < 24; i++) {
            let times = i === 0 ? 12 : (i < 13 ? i : (i - 12));
            let hour = `${String(i).padStart(2, '0')}:00:00`;

            if (hour === currentHourlyTime) {
                playKukuSound(times);
                console.log(`Hourly alarms sounded ${times} times at: ${currentHourlyTime}.\n`);
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
        }
    };

    startButton.addEventListener('click', () => {
        if (!intervalId) {
            setInterval(updateTime, 1000);
            intervalId = setInterval(alarmsCallback, 1000 / 11);
        }
    });
});
