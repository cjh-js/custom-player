const media = document.querySelector('video');
const controls = document.querySelector('.controls');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
const timerWrap = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timerBar');

// Setting rwd, fwd
let intervalRwd;
let intervalFwd;

// rwd, fwd Moving Setting
function windBackward(){
    if(media.currentTime <= 3){
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    }
}

function windForward(){
    if(media.currentTime >= media.duration - 3){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    }
}

function clearWd(){
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

// Remove Media Basic Controls
media.removeAttribute('controls');

// Control Functions
function playPauseMedia(e){
    const icon = play.querySelector('i');
    if(media.paused){
        icon.className = 'fas fa-pause fa-2x';
        media.play();
    } else {
        icon.className = 'fas fa-play fa-2x';
        media.pause();
    }
}

function stopMedia(){
    media.pause();
    media.currentTime = 0;
    const icon = play.querySelector('i');
    icon.className = 'fas fa-play fa-2x';
    clearWd();
}

function mediaBackward(){
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if(rwd.classList.contains('active')){
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward(){
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if(fwd.classList.contains('active')){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

// Time-Bar Controller
function setTime(){
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if(minutes < 10){
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if(seconds < 10){
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;

    timerBar.value = (media.currentTime/media.duration) * 100;
}

function setVideoProgress(){
    media.currentTime = (timerBar.value * media.duration) / 100;
}

// Event Listener
play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('ended', stopMedia);
media.addEventListener('click', playPauseMedia);
media.addEventListener('timeupdate', setTime);
timerBar.addEventListener('input', setVideoProgress);
