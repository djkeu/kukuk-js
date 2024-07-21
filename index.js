document.addEventListener('DOMContentLoaded', (event) => {
    const kukuTime = document.getElementById('kuku_time');
    
    const updateTime = () => {
        const now = new Date();
        kukuTime.textContent = now.toLocaleTimeString();
    };

    setInterval(updateTime, 1000);
    updateTime();

    const alarmsCallback = () => {
        minutelyAlarms();
        quarterlyAlarms();
        hourlyAlarms();
    };

    setInterval(alarmsCallback, 1000 / 11);

    const playKukuSound = (times = 1) => {
        const audio = new Audio('sounds/keukuk03.wav');
        let count = 0;

        const playSound = () => {
            if (count < times) {
                audio.play();
                count++;
                setTimeout(playSound, 1100); // play every 1.1 seconds
            }
        };

        playSound();
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
});
