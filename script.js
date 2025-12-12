let pausebtn=document.getElementById("centerbtn");
let audio=document.getElementById("myAudio");
let progressbar=document.getElementById("progressBar");
let progressBarContainer = document.querySelector(".progress-bar-container"); // The outer track
let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");
let nextbtn = document.getElementById("rightbtn");
let previousbtn = document.getElementById("leftbtn");
const tracks = [
    "happytrack1.mp3", "happytrack2.mp3", "happytrack3.mp3",
    "sadtrack1.mp3", "sadtrack2.mp3", "sadtrack3.mp3",
    "energetictrack1.mp3", "energetictrack2.mp3", "energetictrack3.mp3",
    "motivatedtrack1.mp3", "motivatedtrack2.mp3", "motivatedtrack3.mp3"
];
let happy = document.getElementById("happycard");
let sad = document.getElementById("sadcard");
let energetic = document.getElementById("energeticcard");
let motivated = document.getElementById("motivatedcard");
let trackname;
let vibe = 0; //0=happy,1=sad,2=energetic,3=motivated

function playaudio()
{
    audio.play();
}

audio.onended = function() 
{
    pausebtn.textContent = "▷"; // Reset to play icon
    audio.currentTime = 0;
    currentTimeEl.textContent='0:00';

playnexttrack();
};

function playnexttrack()
{
    let i=0;
    let j=0;
    if (vibe==0) //happy
    {
        i=0;
        j=2;
    }if (vibe==1) //sad
    {
        i=3;
        j=5;
    }if (vibe==2) //energetic
    {
        i=6;
        j=8;
    }if (vibe==3) //motivated
    {
        i=9;
        j=11;
    }
    let currentindex = tracks.indexOf(trackname);
    if (currentindex==j)
        currentindex=i;
    else
        currentindex++;
    audio.src=tracks[currentindex];
    playaudio();
}

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
        } else {
        // Pause logic
        audio.pause();
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
    trackname=fileName;
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
happy.onclick= function()
{
    vibe=0;
    openplayer();
};
sad.onclick= function()
{
    vibe=1;
    audio.src=tracks[3];
    openplayer();
};
energetic.onclick= function()
{
    audio.src=tracks[6];
    vibe=2;
    openplayer();
};
motivated.onclick= function()
{
    audio.src=tracks[9];
    vibe=3;
    openplayer();
};
function openplayer()
{
window.open("#player", "_self");
pausebtn.textContent = "I I"; // Set to Pause icon
let playerDiv=document.getElementById("player");
    playerDiv.style.display = 'block';
    playaudio();
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
    
    audio.src=tracks[0];
};
nextbtn.onclick=playnexttrack;
previousbtn.onclick=function(){
    let currentindex = tracks.indexOf(trackname);
    if (currentindex==0||currentindex==3||currentindex==6||currentindex==9)
    {
        return;
    }
    else
        currentindex--;
        audio.src=tracks[currentindex];
        playaudio();
}
previousbtn.onmouseenter= function ()
{
    let currentindex = tracks.indexOf(trackname);
    if (currentindex==0||currentindex==3||currentindex==6||currentindex==9)
        previousbtn.style.cursor='not-allowed';
    else
        previousbtn.style.cursor="pointer";
}
audio.onplaying=function()
{
pausebtn.textContent = "I I"; // Set to Pause icon
}
audio.onpause=function()
{
        pausebtn.textContent = "▷"; // Set to Play icon
}