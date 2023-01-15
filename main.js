const playerContainer = document.querySelector("[data-player-container]");
const playBtn = document.querySelector("[data-play]");
const prevBtn = document.querySelector("[data-previous]");
const forwardBtn = document.querySelector("[data-forward]");
const audio = document.querySelector("[data-audio]");
const audioTitle = document.querySelector("[data-title]");
const audioImage = document.querySelector("[data-music-image]");
const progressContainer = document.querySelector("[data-progress-container]");
const progressBar = document.querySelector("[data-progress]");
const totalDuration = document.querySelector("[data-total-time]");
const currentDuration = document.querySelector("[data-current-time]");

const songs = ["hey", "summer", "ukulele"];

let currentSongIndex = 2;

function displaySong(name) {
    audioTitle.innerText = name;
    audio.src = `music/${name}.mp3`;
    audioImage.src = `images/${name}.jpg`;

    updateTotalDuration();
}

displaySong(songs[currentSongIndex]);

function pauseSong() {
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playerContainer.classList.remove("play");

    audio.pause();
}

function playSong() {
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playerContainer.classList.add("play");

    audio.play();
}

function playPauseMusic() {
    let isMusicPlaying = playerContainer.classList.contains("play");
    if (isMusicPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong(){
    currentSongIndex++;

    if(currentSongIndex > (songs.length - 1)){
        currentSongIndex = 0;
    }

    displaySong(songs[currentSongIndex]);
    playSong();
}

function previousSong(){
    currentSongIndex--;

    if(currentSongIndex < 0){
        currentSongIndex = songs.length - 1;
    }

    displaySong(songs[currentSongIndex]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercentage = (currentTime/duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    currentDuration.innerText = secondsToMinutesAndSeconds(currentTime);
}

function changeProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}

function secondsToMinutesAndSeconds(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = Math.round(timeInSeconds % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }  

  function updateTotalDuration(){
    audio.onloadedmetadata = function() {
        totalDuration.innerText = secondsToMinutesAndSeconds(audio.duration)
      };
}

playBtn.addEventListener("click", playPauseMusic);
forwardBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", previousSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", changeProgress);



const durationOfAudio = parseFloat(audio.duration)
console.log(audio);
console.log(secondsToMinutesAndSeconds(durationOfAudio));

  