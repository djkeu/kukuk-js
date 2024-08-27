Translating the Kuku app to Kotlin would mean creating an Android application, as Kotlin is primarily used for Android development. Below, I’ll outline how you can translate the key features of the Kuku app from JavaScript/HTML/CSS to a Kotlin-based Android app. This involves creating the UI in XML, handling the logic in Kotlin, and ensuring the app can play sounds and show messages at specified intervals.

### 1. **Setting Up the Android Project**

First, you need to create a new Android project in Android Studio:

- **File > New > New Project**
- Choose "Empty Activity"
- Set the language to Kotlin.

### 2. **Creating the UI**

The UI in Android is defined using XML. Here’s an example that roughly mirrors the HTML structure:

**activity_main.xml:**
```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/beige"
    android:padding="16dp">

    <TextView
        android:id="@+id/kukuTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Kuku"
        android:textSize="48sp"
        android:textColor="@color/darkred"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"/>

    <TextView
        android:id="@+id/kukuTime"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="00:00:00"
        android:textSize="32sp"
        android:textColor="@color/darkred"
        android:layout_below="@id/kukuTitle"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="10dp"/>

    <ImageView
        android:id="@+id/kukuImage"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/kukuTime"
        android:src="@drawable/kukua09Right"/>

    <Button
        android:id="@+id/startButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start Kuku"
        android:background="@color/darkred"
        android:textColor="@android:color/white"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/kukuImage"
        android:layout_marginTop="20dp"/>

    <Spinner
        android:id="@+id/alarmSelector"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:entries="@array/alarm_modes"
        android:layout_below="@id/startButton"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"/>
</RelativeLayout>
```

**res/values/strings.xml:**
```xml
<resources>
    <string name="app_name">Kuku</string>
    <string-array name="alarm_modes">
        <item>Minutes</item>
        <item>Hours and fifteen minutes</item>
        <item>Hours</item>
    </string-array>
</resources>
```

**res/values/colors.xml:**
```xml
<resources>
    <color name="beige">#F5F5DC</color>
    <color name="darkred">#8B0000</color>
</resources>
```

### 3. **Writing the Logic in Kotlin**

Now, translate the JavaScript logic into Kotlin. This includes handling the timer, switching between images, and playing sounds.

**MainActivity.kt:**
```kotlin
package com.example.kuku

import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var kukuTime: TextView
    private lateinit var kukuImage: ImageView
    private lateinit var startButton: Button
    private lateinit var alarmSelector: Spinner
    private lateinit var mediaPlayer: MediaPlayer
    private val handler = Handler(Looper.getMainLooper())
    private var isPlaying = false
    private var intervalId: Runnable? = null
    private var isShowingImage = true
    private val kukuTimes = mapOf(
        "Minutes" to 60000L, 
        "Hours and fifteen minutes" to 3600000L + 900000L, 
        "Hours" to 3600000L
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        kukuTime = findViewById(R.id.kukuTime)
        kukuImage = findViewById(R.id.kukuImage)
        startButton = findViewById(R.id.startButton)
        alarmSelector = findViewById(R.id.alarmSelector)
        mediaPlayer = MediaPlayer.create(this, R.raw.keukuk03) // Sound file in res/raw/

        startButton.setOnClickListener {
            startKuku()
        }

        updateTime()
    }

    private fun startKuku() {
        startButton.visibility = View.GONE // Hide the start button
        val selectedAlarm = alarmSelector.selectedItem.toString()
        val interval = kukuTimes[selectedAlarm] ?: 60000L

        intervalId = object : Runnable {
            override fun run() {
                playKukuSound()
                handler.postDelayed(this, interval)
            }
        }

        handler.post(intervalId!!)
    }

    private fun playKukuSound() {
        if (isPlaying) return
        isPlaying = true

        kukuImage.visibility = View.INVISIBLE // Hide image during sound play
        mediaPlayer.start()
        mediaPlayer.setOnCompletionListener {
            kukuImage.visibility = View.VISIBLE // Show image again
            isPlaying = false
        }
    }

    private fun updateTime() {
        handler.postDelayed(object : Runnable {
            override fun run() {
                val currentTime = SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(Date())
                kukuTime.text = currentTime
                handler.postDelayed(this, 1000)
            }
        }, 1000)
    }
}
```

### 4. **Handling Permissions and Background Tasks**

To ensure the app can play sounds in the background:

- **Foreground Service:** For continuous background execution, consider using a Foreground Service in Android.
- **Battery Optimization:** Prompt users to exclude the app from battery optimization to prevent the OS from stopping the app.

### 5. **Running the App**

Once you’ve set up everything:

- Place your sound file (e.g., `keukuk03.mp3`) in the `res/raw/` directory.
- Ensure your images (`kukua09Right.png`, etc.) are in the `res/drawable/` directory.
- Run the app on your Android device or emulator.

### Summary

This Kotlin-based Android app replicates the Kuku functionality, playing sounds at specified intervals with an option to choose different modes. The app UI is handled through XML, and the logic is managed with Kotlin, leveraging Android’s powerful capabilities. This approach makes the Kuku app more versatile, allowing it to run as a full-fledged mobile application.
