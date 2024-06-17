//music function
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playlist = document.getElementById('playlist');

    const songs = [
        { name: 'Deep Meditation', source: 'Deep Meditation.mp3' },
        { name: 'Nature birds', source: 'Nature birds  sound.mp3' },
        { name: 'Sunset Lover', source: 'Sunset Lover.mp3' },
        { name: 'Lord Krishna Flute', source: 'Lord Krishna Flute.mp3' },
        // Add more songs as needed
    ];

    // Populate playlist
    songs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.name}`;
    listItem.addEventListener('click', () => playSong(index));
    playlist.appendChild(listItem);
  });

    // Play the first song by default
    playSong(0);

    // Function to play a specific song
    function playSong(index) {
        const selectedSong = songs[index];
        audioPlayer.src = selectedSong.source;
        audioPlayer.play();

        // Highlight the selected song in the playlist
        const listItems = document.querySelectorAll('li');
        listItems.forEach((item, i) => {
            item.style.color = i === index ? '#009688' : '#333';
        });
    }
});


// change bg img every min 
// JavaScript to set interval for background change
function changeBackground() {
    setInterval(() => {
        document.querySelector('.background-container').style.animation = 'none';
        void document.querySelector('.background-container').offsetWidth; // Trigger reflow
        document.querySelector('.background-container').style.animation = null;
    }, 600000); // 10 minutes in milliseconds
}

document.addEventListener('DOMContentLoaded', changeBackground);


const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountsDisplay= document.querySelector('.promoCountsDisplay');

//Making variables                                                              correct
const WORK_TIME =  25* 60;   
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundCompleted = false; // one round = work + break
let totalCount = 0;
let Paused = false; //

//function to update title
const updateTitle = (msg) => {
    title.textContent =msg;
}
//function to save pomorodo count                                                      ?
const saveLocalCount =()=> {
    const count = JSON.parse(localStorage.getItem("pomoCounts"));

    count !== null? count++ : count = 1;
    count++;
    localStorage.setItem("pomoCounts",JSON.stringify(count))
}
// ...

// countdown function 
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time/60).toString().padStart(2, '0');
        const secs = Math.floor(time%60).toString().padStart(2, '0');
        // timer
        timer.textContent = `${mins}:${secs}`;
        time--;
        if(time < 0){
            stopTimer();
            if (!oneRoundCompleted){
                timerID =  startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("It's Break Time !");
            }
            else{
                updateTitle("Completed 1 Round of Pomodoro Technique !");
                setTimeout(() => updateTitle("Start Timer Again !"),2000);
                totalCount++;
                saveLocalCount();
            }
        }
    };
};

//Arrow Function to start timer (time)
const startTimer = (startTime) => {
    if (timerID !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
};

// ...

//timer to stop
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}
//                                                                      correct 
const getTimeInSeconds = (timeString) => {
    const[minutes, seconds] = timeString.split(":");
    return parseInt(minutes *60) +parseInt(seconds);

}
// Adding event listener to start button
startBtn.addEventListener('click', ()=> {
    timerID = startTimer(WORK_TIME);
});

//Adding Event Listener to reset button //                               correct 
resetBtn.addEventListener('click',() => {
    stopTimer();
    timer.textContent ="25:00";
    updateTitle("Click Start to Start timer !");
});

//Adding event listener to Pause button                                  correct
pauseBtn.addEventListener('click',()=> {
    stopTimer();
    Paused = true;
    updateTitle("Timer Paused");
});

//Adding event listener to resume button                                  correct
resumeBtn.addEventListener('click',()=> {
    if(Paused){
        const currentTimer = getTimeInSeconds(timer.textContent);
        timerID= startTimer(currentTimer);
        Paused=false;
        (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time");
    }
});

// Function to show completed pomodoros to screen from local storage

const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts")); console.log(counts);   
    if (counts > 0) {   
    pomoCountsDisplay.style.display = "flex";   
    }   
    pomoCountsDisplay.firstElementChild.textContent = counts;   
    }   
    showPomoCounts();
