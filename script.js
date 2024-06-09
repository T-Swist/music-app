
//Using map.random to get random photo as the cover photo
  let getImgByRandom = Math.floor(Math.random() * 11 ) + 1;
  let currentCoverImg = document.getElementById("song_cover_image");
  let pickingARandomImg = `images(${getImgByRandom}).jpeg`;
  let showRandomImg = `./assets/img/${pickingARandomImg}`;
  // console.log(getImgByRandom);

  currentCoverImg.setAttribute("src", showRandomImg);


 let stepGoing = document.getElementById("step_going");
 let song = document.getElementById("song");
 let playPauseSong = document.getElementById("playPauseSong");
 let currentTimeDisplay = document.getElementById("current_time");
 let durationTimeDisplay = document.getElementById("duration_time");
 let repeatButton = document.getElementById("repeatSong");
 let isRepeating = false;
 let currentIndex = 0;

 const songListItems = document.querySelectorAll('#songs_list ul li'); 

song.onloadedmetadata = function() {
  stepGoing.max = song.duration;
  stepGoing.value = song.currentTime;
  durationTimeDisplay.textContent = formatTime(song.duration);
}

song.ontimeupdate = function() {
  stepGoing.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);
};

function playPause(){
  if(playPauseSong.classList.contains("fa-pause")){
    song.pause();
    playPauseSong.classList.remove("fa-pause");
    playPauseSong.classList.add("fa-play");
  }
  else{
    song.play();
    playPauseSong.classList.add("fa-pause");
    playPauseSong.classList.remove("fa-play");
  }
}

// Update the song's current time when the progress bar is changed
stepGoing.addEventListener('input', function() {
  song.currentTime = stepGoing.value;
});

// Play the selected song from the list
songListItems.forEach((item, index) => {
  item.addEventListener('click', function() {
      currentIndex = index;
      let src = this.getAttribute('data-src');
      song.src = src;
      song.play();
      playPauseSong.classList.add("fa-pause");
      playPauseSong.classList.remove("fa-play");
  });
});

// Format the time in minutes and seconds
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) {
      secs = `0${secs}`;
  }
  return `${minutes}:${secs}`;
}

// Play the next song
function nextSong() {
  currentIndex = (currentIndex + 1) % songListItems.length;
  playSongAtIndex(currentIndex);
}

// Play the previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + songListItems.length) % songListItems.length;
  playSongAtIndex(currentIndex);
}

// Play a song by index
function playSongAtIndex(index) {
  let item = songListItems[index];
  let src = item.getAttribute('data-src');
  song.src = src;
  song.play();
  playPauseSong.classList.add("fa-pause");
  playPauseSong.classList.remove("fa-play");
}

// Toggle repeat functionality
function toggleRepeat() {
  isRepeating = !isRepeating;
  repeatButton.classList.toggle('active', isRepeating);
  repeatButton.classList.toggle("fa-xmark");
}

// Repeat the song if repeat is enabled
song.onended = function() {
  if (isRepeating) {
      song.play();
  } else {
    nextSong();
  }
};

function showMusicList() {
    
  let openMusicList = document.querySelector(".fa-bars");
  
  let musicShow = document.querySelector("#songs_list");

  let rLAngle = document.querySelector(".fa-angle-right");
  
  openMusicList.addEventListener("click", function() {
      
      openMusicList.classList.toggle("fa-xmark");
      rLAngle.classList.toggle("fa-angle-left");
      musicShow.classList.toggle("showingMenu");

   
  });
  }
  
  showMusicList();




