let pausebtn=document.getElementById("centerbtn");
let player=document.getElementById("player");
let audio=document.getElementById("myAudio");
let progressbar=document.getElementById("progressBar");
let progressBarContainer = document.querySelector(".progress-bar-container"); // The outer track
let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");
let nextbtn = document.getElementById("rightbtn");
let previousbtn = document.getElementById("leftbtn");
let creditsbtn = document.getElementById("creditsbtn");
let happy = document.getElementById("happycard");
let sad = document.getElementById("sadcard");
let energetic = document.getElementById("energeticcard");
let motivated = document.getElementById("motivatedcard");
let trackname;
let creditsinfo;
let vibe = 0; //0=happy,1=sad,2=energetic,3=motivated
const tracks = [
    "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/018/never-give-up-on-loving-you-1764896468-Csbo2JmIso.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/758/on-and-on-1727308858-tLh4ktBdt5.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/750/heroes-tonight-x-dreams-pt-ii-mashup-1725969652-gPmvlvBBTP.mp3",
    
    "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/017/scars-1764896463-xsRdrCuldh.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/012/fireflies-1764032464-3c4tlYQgRQ.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/969/round-around-1758585663-KzABbY3nfl.mp3",
    
    "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/022/lost-pt-ii-1765501267-X9EsqWRb8U.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/021/see-the-sun-1765414865-S9PH5x4mCY.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/019/needed-you-1765242065-eBG1mS8tyL.mp3",
    
    "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/959/all-weve-ever-known-ft-fred-v-immy-odon-1756476063-giqRRYJNfs.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/974/1759489943_WNu03JmYAO_LANCELOT-ACIGODE-SXYGX---Loop-NCS-Release.mp3", "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/004/mortals-rameses-b-remixs-1762477276-EqCZQdL0px.mp3"
];
const tracksJson = [
    { "src": tracks[0], "name": "Never Give Up On Loving You","credits":"Song: KUČKA - Never Give Up On Loving You\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/NGUOLY\nWatch: ncs.lnk.to/NGUOLYAT/youtube" },
    { "src": tracks[1], "name": "On and On","credits":"Song: BAYZY, Sayfro - On and On [NCS Release]\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/BS\\_OnandOn\nWatch: ncs.lnk.to/BS\\_OnandOnAT/youtube" },
    { "src": tracks[2], "name": "Heroes Tonight x Dreams pt.II Mashup","credits":"Song: Heroes Tonight x Dreams pt. II Mashup\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/HTD" },
    
    { "src": tracks[3], "name": "scars","credits":"Song: lofin - scars\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/scars\nWatch: ncs.lnk.to/scarsAT/youtube" },
    { "src": tracks[4], "name": "Fireflies","credits":"Song: Krezus & surreal_dvd - Fireflies\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/fireflies\nWatch: ncs.lnk.to/firefliesAT/youtube" },
    { "src": tracks[5], "name": "Round Around","credits":"Song: HXI, Nateki - Round Around\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/roundaround\nWatch: ncs.lnk.to/roundaroundAT/youtube" },
    
    { "src": tracks[6], "name": "Lost pt.II","credits":"Song: Lost Sky x Shiah Maisel - Lost pt. II\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/lostptii\nWatch: ncs.lnk.to/lostptiiAT/youtube" },
    { "src": tracks[7], "name": "See The Sun","credits":"Song: Abstrakt, weloveyouspydee - See The Sun\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/SEETHESUN\nWatch: ncs.lnk.to/SEETHESUNAT/youtube" },
    { "src": tracks[8], "name": "Needed You by NOON","credits":"Song: NOON - Needed You\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/neededyou\nWatch: ncs.lnk.to/neededyouAT/youtube" },
    
    { "src": tracks[9], "name": "All We've Ever Known (ft. Fred V & Immy Odon)","credits":"Song: Cartoon - All We've Ever Known (ft. Fred V & Immy Odon)\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/allweveeverknown\nWatch: ncs.lnk.to/allweveeverknownAT/youtube" },
    { "src": tracks[10], "name": "LOOP","credits":"Song: LANCELOT, ACIGODE, SXYGX - Loop\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/loop\nWatch: ncs.lnk.to/loopAT/youtube" },
    { "src": tracks[11], "name": "Mortals (Rameses B Remix)","credits":"Song: Warriyo - Mortals (Rameses B Remix)\nMusic provided by NoCopyrightSounds\nFree Download/Stream: ncs.io/mortalsramesesbremix\nWatch: ncs.lnk.to/mortalsramesesbremixAT/youtube" },

];
function gettrackname()
{
    let currentSrc=audio.src;
    const newTrack = tracksJson.find(function(track) {return currentSrc.includes(track.src);});  //put found object into newTrack
    if (newTrack) //if newTrack is not empty
        {
        trackname= newTrack.name;
        creditsinfo=newTrack.credits;
        }
         else //if empty
        {
        creditsinfo="Unknown Track, No credits."
            trackname= "Unknown Track"; // If no match is found.
        }
    document.getElementById("trackname").querySelector('p').textContent = trackname;
}
creditsbtn.onclick=function()
{
    displaycredits();
}

function displaycredits(e=0)
{
    if (e)
        newdiv.remove();
    else if (document.getElementById('credits'))
        return;
    else
        {
    newdiv = document.createElement('div');
    newdiv.id = 'credits';
    newdiv.style.position = 'fixed';
    newdiv.style.bottom = '60%';
    newdiv.style.left = '50%';
    newdiv.style.transform = 'translate(-50%, 50%)';
    newdiv.style.backgroundColor = 'rgba(11, 11, 21, 0.78)';
    newdiv.style.color = 'white';
    newdiv.style.padding = '2vw';
    newdiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    newdiv.style.borderRadius = '2vw';
    newdiv.style.zIndex = '100';
   // newdiv.style.maxWidth = '300px';
    newdiv.style.fontSize = '18px';
    newdiv.textContent = creditsinfo;
    newdiv.style.userSelect = 'text';
    newdiv.style.whiteSpace = 'pre-wrap'; // Preserves newlines and wraps text
newtext.style.overflowWrap = 'break-word'; // Forces long URLs to break onto the next line
    player.appendChild(newdiv);
    closebtn = document.createElement('span');
    closebtn.textContent = '×';
    closebtn.style.position = 'absolute';
    closebtn.style.color = 'lightred';
    closebtn.style.fontWeight = 'bold';
    closebtn.style.borderRadius = '50%';
    closebtn.style.padding = '0px 8px';
    closebtn.style.border = '1px solid red';
    closebtn.style.paddingBottom = '2px';
    closebtn.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    closebtn.style.top = '-14px';
    closebtn.style.right = '-14px';
    closebtn.style.cursor = 'pointer';
    closebtn.style.fontSize = '18px';
    closebtn.onclick = function() {
        newdiv.style.opacity = '0';
        newdiv.style.transition = 'opacity 0.5s'; 
        setTimeout(function() {
        if (newdiv) {
            newdiv.remove();
        }
    }, 500);
    };
    newdiv.appendChild(closebtn);
        }
}
function playaudio()
{
    audio.play();
}

audio.onended = function() 
{
    pausebtn.textContent = "▷"; // for that glitchy animation
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
    let currentindex = tracks.indexOf(audio.src);
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
        if (player.style.display !== 'none') {
             pauseplay();
        }
    }
});
//Setup Audio Duration when Metadata is loaded
audio.onloadedmetadata = function() {
    totalDurationEl.textContent = formatTime(audio.duration);
    gettrackname();
    let currentindex = tracks.indexOf(trackname);
    if (currentindex==0||currentindex==3||currentindex==6||currentindex==9)
    {
       previousbtn.style.color='var(--text-muted)';
    }
    else
        previousbtn.style.color='var(--neon-accent)';
    if (document.getElementById('credits'))
    {
    document.getElementById('credits').textContent = creditsinfo;
    document.getElementById('credits').appendChild(closebtn);
    }
};

// Update Progress Bar and Current Time
audio.ontimeupdate = function() 
{
    if (!isNaN(audio.duration)) {
        const progressPercent = (audio.currentTime / audio.duration) * 96.5;
        progressBar.style.width = progressPercent + 3.5 + '%'; //tweak to fix the weird visual behaviour of progress bar
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
};
// Seeking (Clicking the progress bar) this was made by help of AI
progressBarContainer.onclick = function(e) {
    if (!isNaN(audio.duration)) {
        // Calculate click position relative to the container width
        const containerWidth = this.clientWidth-(this.clientWidth*0.035); //tweaking ui
        const clickX = e.clientX- this.getBoundingClientRect().left;
        const seekTime = ((clickX) / containerWidth) * audio.duration-3.5; //tweaking ui
        audio.currentTime = seekTime;
    }
};
happy.onclick= function()
{
    vibe=0;
    openplayer();
    player.style.background="linear-gradient(135deg, #1e2f3bff 0%, #1a354eff 25%, #1a3a3a 100%, #1a2a4e 75%, #1e293b 100%)";
    player.style.backgroundSize="400% 400%";
};
sad.onclick= function()
{
    vibe=1;
    audio.src=tracks[3];
    openplayer();    
    player.style.background="linear-gradient(135deg, #1e203bff 50%, #4e1a2dff 15%, #1a293aff 50%, #1a2a4e 75%, #1e293b 100%)";
    player.style.backgroundSize="200% 200%";
};
energetic.onclick= function()
{
    audio.src=tracks[6];
    vibe=2;
    openplayer();    
    player.style.background="linear-gradient(135deg, #1e273bff 10%, #4e451aff 100%, #1a293aff 50%, #1a2a4e 75%, #1e293b 100%)";
    player.style.backgroundSize="200% 200%";
};
motivated.onclick= function()
{
    audio.src=tracks[9];
    vibe=3;
    openplayer();
    player.style.background="linear-gradient(135deg, #1e273bff 10%, #4e1a46ff 100%, #1a293aff 50%, #1a2a4e 75%, #1e293b 100%)";
    player.style.backgroundSize="200% 200%";
};
function openplayer()
{
    gettrackname();
window.open("#player", "_self");
let playerDiv=document.getElementById("player");
    playerDiv.style.display = 'block';
    playaudio();
}
// to switch back to home
let homebtn=document.getElementById("homebtn")
homebtn.onclick=function gohome()
{
    displaycredits(1);
window.open("#", "_self");
audio.pause();
pausebtn.textContent="▷";
    player.style.display = 'none';
    audio.src=tracks[0];

};
nextbtn.onclick=playnexttrack;
previousbtn.onclick=function(){
    let currentindex = tracks.indexOf(audio.src);
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
    let currentindex = tracks.indexOf(audio.src);
    if (currentindex==0||currentindex==3||currentindex==6||currentindex==9)
        {
            previousbtn.style.cursor='not-allowed';
        }
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