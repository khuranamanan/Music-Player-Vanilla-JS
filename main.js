const playerContainer = document.querySelector("[data-player-conatainer]");

// querySelector("[data-play]")
document.addEventListener("click",()=>{
    playerContainer.classList.toggle("play");
})