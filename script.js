const kendrick = document.getElementById('kendrick');
const drake = document.getElementById('drake');
const track = document.querySelector('.track');
const finishLine = document.querySelector('.finish-line');
const levelDisplay = document.getElementById('level');
const clicksDisplay = document.getElementById('clicks');
const winnerMessage = document.getElementById('winnerMessage');
const confettiContainer = document.querySelector('.confetti-container');
const backgroundMusic = document.getElementById('backgroundMusic');
const countdownDisplay = document.getElementById('countdown');
const runTextDisplay = document.getElementById('runText');
const countdownSound = document.getElementById('countdownSound');
const winSounds = [
    document.getElementById('winSound1'),
    document.getElementById('winSound2'),
     document.getElementById('winSound3')
    ];
const loseSounds = [
   document.getElementById('loseSound1'),
  document.getElementById('loseSound2'),
  document.getElementById('loseSound3')
];

const trackWidth = track.offsetWidth;
const racerWidth = kendrick.offsetWidth;
const finishLinePosition = trackWidth - finishLine.offsetWidth - 10;
let level = 1;
let clicks = 0;
let kendrickPosition = 10;
let drakePosition = 10;
let drakeSpeed = 0;
let racing = false;
let currentWinSoundIndex = 0;
let currentLoseSoundIndex = 0;


function calculateDrakeSpeed() {
   if (level <= 3) {
        return 0.2 * level + 0.3;
    } else if (level <= 6) {
        return 0.2 * level + 0.9;
    } else if (level <= 8)
    {
         return 0.2 * level + 1.8;
    }
    else {
        return 0.2 * level + 2.8;
    }
}
track.addEventListener('click', handleTrackClick);

function handleTrackClick() {
    if (!racing) return;
    clicks++;
    clicksDisplay.textContent = clicks;
    kendrickPosition += 15;
    kendrick.style.left = `${kendrickPosition}px`;
     if (kendrickPosition + racerWidth >= finishLinePosition)
        {
            racing = false;
             winnerMessage.textContent = "You Won! ";
             playWinSound();
            createConfetti();
             level++;
            levelDisplay.textContent = level;
            setTimeout(resetGame, 2000);
       }
}
function gameLoop() {
   if(racing){
        drakePosition += drakeSpeed;
        drake.style.left = `${drakePosition}px`;
       if (drakePosition + racerWidth >= finishLinePosition)
        {
           racing = false;
            winnerMessage.textContent = "Drake Won!";
           playLoseSound();
          setTimeout(resetGame, 2000);
      }
    }
    requestAnimationFrame(gameLoop);
}

function resetGame(){
    kendrickPosition = 10;
   drakePosition = 10;
  clicks = 0;
  clicksDisplay.textContent = clicks;
     kendrick.style.left = `${kendrickPosition}px`;
     drake.style.left = `${drakePosition}px`;
     winnerMessage.textContent = "";
     confettiContainer.innerHTML = "";
      drakeSpeed = calculateDrakeSpeed();
     runCountdown();
}
function createConfetti() {
     const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
     for (let i = 0; i < 150; i++) {
          const confetti = document.createElement("div");
         confetti.classList.add("confetti");
       confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
         confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

function playWinSound(){
     backgroundMusic.volume = 0.2;
      const winSound = winSounds[currentWinSoundIndex];
      winSound.currentTime = 0;
      winSound.play();
       currentWinSoundIndex = (currentWinSoundIndex + 1) % winSounds.length;
     setTimeout(() => {
         backgroundMusic.volume = 1;
     }, 1000); // Shortened to 1 second for faster reset

}

function playLoseSound(){
     backgroundMusic.volume = 0.2;
    const loseSound = loseSounds[currentLoseSoundIndex];
   loseSound.currentTime = 0;
     loseSound.play();
    currentLoseSoundIndex = (currentLoseSoundIndex + 1) % loseSounds.length;
  setTimeout(() => {
      backgroundMusic.volume = 1;
  }, 1000); // Shortened to 1 second for faster reset
}
function playCountdownSound(){
   backgroundMusic.volume = 0.2;
    countdownSound.currentTime = 0;
     countdownSound.play();
   setTimeout(() => {
     backgroundMusic.volume = 1;
   }, 1000);  // Shortened to 1 second for faster reset
}

function runCountdown() {
    let countdownValue = 3;
    countdownDisplay.textContent = countdownValue;
   playCountdownSound();
    const countdownInterval = setInterval(() => {
      countdownValue--;
      countdownDisplay.textContent = countdownValue;
      if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          countdownDisplay.textContent = "";
          racing = true;
         runTextDisplay.style.animationPlayState = 'running';
          backgroundMusic.play();
           setTimeout(() => {
             runTextDisplay.style.animationPlayState = 'paused';
           runTextDisplay.style.left = "-100%";
        }, 1000);
       }
    }, 1000);
}

 resetGame();
gameLoop();