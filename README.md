# Kuku - a digital cuckoo clock for pc and phone


## Index

- Description
- ToDo
- About Kuku
- Abandoned versions
- Continuous play


### Description

Always wanted to own a cuckoo clock but couldn't afford one?
Well, bless the marvels of the modern world, you can get one on your phone right now. For Free!

Kukuk is an app that mimics a cuckoo-clock, written in JavaScript.
A cuckoo sound is played once every 15 minutes and multiple times according to the hour of the day.


### ToDo

- User notification about What's new
- Dark theme
- Show bird when kuku-ing
- Analogue clock inside drawing
- Menu button
    - Done: About
    - ToDo: What's new
    - ToDo: Dark theme
- Continuous play when not active on mobile device, see bottom of file for explanation and sample code


### About Kuku

- Author: Marc Kooij
- Name program: Kuku
- Year of development of JS-version: 2024
- e-mail: post@djkeu.nl
- Github: https://github.com/djkeu/kukuk-js
- Netlify: https://kuku-klok.netlify.app/


### Abandoned versions

#### Python:
Using Kivy framework for GUI\
Github repository: https://github.com/djkeu/kukuk_python

#### Kotlin:
Switched to Kotlin for better performance on Android\
Github repository: https://github.com/djkeu/kukuk-kotlin


### Continuous play

Yes, it's possible to run the Kuku application in the background and allow the audio to play even when the user switches to a different app or minimizes the browser. Here's how you can achieve this:

#### 1. **Background Audio Handling**

Most modern browsers allow audio to continue playing in the background, but it depends on the implementation and user settings.

#### 2. **Ensure the Audio Continues in the Background**

To ensure the Kuku sound plays in the background, you need to make sure that:

- The `audio` element or `Audio` object is not dependent on user interaction to start playing, which you’ve already addressed with the "Start Kuku" button.
- The browser tab is not restricted from playing background audio (some browsers might prompt the user to allow this).

#### 3. **Web API Considerations**

For a more consistent experience, especially if you're considering a mobile environment, you can explore:

- **Service Workers**: These allow you to run background tasks, although they are more complex and typically used for background synchronization, push notifications, or caching rather than continuous audio playback.
  
- **Persistent Background Tasks**: If you're developing a Progressive Web App (PWA), you can use the `Background Fetch API` or `Notification API` to manage tasks in the background. 

#### 4. **Potential Issues**

- **Mobile Browsers**: Some mobile browsers may limit background activity to conserve battery life. For instance, iOS may pause JavaScript execution when the browser is in the background.
  
- **User Permissions**: Some browsers or devices may require the user to grant permission to allow media to continue playing in the background.

#### 5. **Example Implementation**

Here's a simple implementation that ensures the audio continues to play in the background without user interaction restrictions:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('sounds/keukuk03.mp3');
    let isPlaying = false;

    const playKukuSound = async (times = 1) => {
        if (isPlaying) return;
        isPlaying = true;

        for (let i = 0; i < times; i++) {
            audio.currentTime = 0;
            await audio.play().catch(error => console.error('Audio playback failed:', error));
            await new Promise(resolve => setTimeout(resolve, 1200));
        }

        isPlaying = false;
    };

    // Example trigger
    setInterval(() => {
        const now = new Date();
        if (now.getMinutes() % 15 === 0 && now.getSeconds() === 0) {
            playKukuSound(1);
        }
    }, 1000);
});
```

#### 6. **Testing**

- **Desktop Browsers**: Open the Kuku in a tab and switch to another tab or minimize the browser to test if the audio continues.
  
- **Mobile Browsers**: Open the Kuku on your mobile browser and switch to a different app to see if the audio still plays.

If the audio doesn't continue as expected, especially on mobile, you might need to look into more advanced solutions like using a PWA or handling permissions more explicitly.

#### 7. **Note for PWAs**
If you’re interested in turning your app into a Progressive Web App (PWA), it can run more consistently in the background with better control over background processes.

If you want to explore any of these advanced options, let me know, and I can provide more detailed guidance!
