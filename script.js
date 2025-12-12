let pausebtn=document.getElementById("centerbtn");
let audio=document.getElementById("myAudio");
let progressbar=document.getElementById("progressBar");
let progressBarContainer = document.querySelector(".progress-bar-container"); // The outer track
let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// 2. Control Audio Playback
function pauseplay() {
    if (audio.paused) {
        // Play logic
        audio.play();
        pausebtn.textContent = "I I"; // Set to Pause icon
    } else {
        // Pause logic
        audio.pause();
        pausebtn.textContent = "▷"; // Set to Play icon
    }
}
pausebtn.onclick = pauseplay;
document.addEventListener('keydown', function(event) {
    
    // Check if the Spacebar was pressed
    if (event.code === 'Space') {
        
        // Prevent the default browser action.
        event.preventDefault(); 
        
        // Only run the pauseplay function if the player is currently visible
        const playerDiv = document.getElementById('player');
        if (playerDiv.style.display !== 'none') {
             pauseplay();
        }
    }
});
//Setup Audio Duration when Metadata is loaded
audio.onloadedmetadata = function() {
    totalDurationEl.textContent = formatTime(audio.duration);
    // Automatically set the track name based on the file name
    const filePath = audio.getAttribute('src');
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1); // Extract file name
    document.getElementById("trackname").querySelector('p').textContent = fileName;
};

// Update Progress Bar and Current Time
audio.ontimeupdate = function() 
{
    if (!isNaN(audio.duration)) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progressPercent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
};

// Handle song end
audio.onended = function() 
{
    pausebtn.textContent = "▷"; // Reset to play icon
    audio.currentTime = 0;
};
// Seeking (Clicking the progress bar) this was made by help of AI
progressBarContainer.onclick = function(e) {
    if (!isNaN(audio.duration)) {
        // Calculate click position relative to the container width
        const containerWidth = this.clientWidth;
        const clickX = e.clientX      - this.getBoundingClientRect().left;
        
        const seekTime = (clickX / containerWidth) * audio.duration;
        audio.currentTime = seekTime;
    }
};
// to switch to player
let happy=document.getElementById("happycard");
happy.onclick= function openplayer()
{
window.open("#player", "_self"); 
audio.play();
pausebtn.textContent = "I I"; // Set to Pause icon
let playerDiv=document.getElementById("player");
    playerDiv.style.display = 'block';
}
// to switch back to home
let homebtn=document.getElementById("homebtn")
homebtn.onclick=function gohome()
{
window.open("#", "_self");
audio.pause();
pausebtn.textContent="▷";
let playerDiv=document.getElementById("player");
    playerDiv.style.display = 'none';
}