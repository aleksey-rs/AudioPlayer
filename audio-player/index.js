const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio();
audio.volume = .75;

let songs = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3'],
    thumbnails = ['./assets/img/lemonade.png', './assets/img/dontstartnow.png'],
    songArtists = ["Beyonce", "Dua Lipa"],
    songTitles = ["Don't Hurt Yourself", "Don't Start Now"],
    treck = 0;
  
function loadSong(index) {
    audio.src = songs[index];
    audioPlayer.querySelector(".cover").src = thumbnails[index];
    audioPlayer.querySelector(".song-artist").innerHTML = songArtists[index];
    audioPlayer.querySelector(".song-title").innerHTML = songTitles[index];
}

loadSong(treck);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
  },
  false
);

const timeline = audioPlayer.querySelector(".progress");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

const volumeSlider = audioPlayer.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.value = audio.currentTime / audio.duration * 100;
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
  if(audio.currentTime == audio.duration) {
    if(treck == 0) {
      treck++;
      loadSong(treck);
    } else {
      treck = 0;
      loadSong(treck);
    }
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    audio.play();
  }
}, 500);

const playBtn = audioPlayer.querySelector(".toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

const nextSong = audioPlayer.querySelector(".next-song");
nextSong.addEventListener(
  "click",
  () => {
    if(treck == 0) {
      treck++;
      loadSong(treck);
    } else {
      treck = 0;
      loadSong(treck);
    }
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    audio.play();
  },
  false
);

const backSong = audioPlayer.querySelector(".back-song");
backSong.addEventListener(
  "click",
  () => {
    if(treck == 1) {
      treck--;
      loadSong(treck);
    } else {
      treck = 1;
      loadSong(treck);
    }
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    audio.play();
  },
  false
);

const stopSong = audioPlayer.querySelector(".stop-song");
stopSong.addEventListener(
  "click",
  () => {
    loadSong(treck);
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");
    audio.pause();
  },
  false
);