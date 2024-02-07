// Example song data
const songs = [
  {
    name: "Say_Goodbye",
    artist: "VITNE",
    album: "Jupiter",
    image: "Say_Goodbye_-_VITNE.jpg",
    file: "Say_Goodbye_-_VITNE.mp3",
  },
  {
    name: "Peyote",
    artist: "Kinematic",
    album: "kites",
    image: "Peyote_-_Kinematic.jpg",
    file: "Peyote_-_Kinematic.mp3",
  },
  {
    name: "Old_News",
    artist: "Hot_Fiction",
    album: "Apply within",
    image: "Old_News_-_Hot_Fiction.jpg",
    file: "Old_News_-_Hot_Fiction.mp3",
  },
  {
    name: "Not_My_Problem",
    artist: "All_My_Friends_Hate_Me",
    album: "kites",
    image: "Not_My_Problem_-_All_My_Friends_Hate_Me.jpg",
    file: "Not_My_Problem_-_All_My_Friends_Hate_Me.mp3",
  },
  {
    name: "Higher_And_Higher",
    artist: "Inception",
    album: "kites",
    image: "Higher_And_Higher_-_Scream_Inc._(3).jpg",
    file: "Higher_And_Higher_-_Scream_Inc._(3).mp3",
  },
  {
    name: "Boys,_Girls,_Toys_&_Words",
    artist: "Modern_Pitch",
    album: "Eye of the storm",
    image: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg",
    file: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3",
  },
];

//****************************************************************************************************
function displayPlaylist() {
  const playlistView = document.getElementById("playlist-view");
  playlistView.innerHTML = "";
  songs.forEach((song, index) => {
    const songItem = document.createElement("article");
    const songPlayButton = document.createElement("span");
    songItem.className = "song-item";
    songItem.innerHTML = `<figure><img src="assets/${song.image}" alt="${song.album}"/></figure>
        <div class="song-info">
            <p class="upper-text">${song.name}</p>
            <p class="lower-text">${song.artist}</p>
        </div>`;

    songPlayButton.className = "material-icons play";
    songPlayButton.innerText = ` play_circle `;
    songPlayButton.style.cursor = "pointer";
    songPlayButton.addEventListener("click", () => playSong(index));
    songItem.appendChild(songPlayButton);
    playlistView.appendChild(songItem);
  });
}
//****************************************************************************************************
const musicPlayer = document.getElementById("music-player");
const currentSongView = document.getElementById("song");
currentSongView.innerHTML = "";
//************************************************************ */
const songPlayCover = document.createElement("figure");
songPlayCover.className = "album-image-container";
//************************************************************ */
const songInfoContainer = document.createElement("div");
songInfoContainer.className = "song-info-container";
//************************************************************ */
const timeLineContainer = document.createElement("div");
timeLineContainer.className = "time-line-container";
//************************************************************ */
const controlls = document.createElement("div");
controlls.className = "controlls";
//************************************************************ */

let currentSongIndex = -1;

function playSong(index) {
  // Pause current song
  if (currentSongIndex !== -1 && currentSongIndex !== index) {
    musicPlayer.pause();
  }
  musicPlayer.src = `assets/${songs[index].file}`;
  musicPlayer.play();
  // UI
  songPlayCover.innerHTML = `<img src="assets/${songs[index].image}" alt="${songs[index].album}">`;
  currentSongView.appendChild(songPlayCover);
  songInfoContainer.innerHTML = `
  <span class="add material-icons"> add_circle_outline </span>
          <div class="song-info">
            <p class="upper-text"> ${songs[index].name} </p>
            <p class="lower-text"> ${songs[index].artist} </p>
          </div>
          <span class="heart material-icons"> favorite </span>`;
  currentSongView.appendChild(songInfoContainer);
  console.log("first");
  timeLineContainer.innerHTML = `
  <input
          type="range"
          id="progress-bar"
          value="0"
          max="100"
          step="0.1"
          oninput="updateProgressBar()"
        />`;
  currentSongView.appendChild(timeLineContainer);
  controlls.innerHTML = `
  <span class="material-icons"  id="loop-btn" onclick="toggleLoop()">repeat</span>
  <span class="material-icons previous" id="prev-btn" onclick="previousSong()">fast_rewind</span>
  <span class="material-icons play" id="play-pause-btn" onclick="playPauseSong(currentSongIndex)">
  play_circle_filled  </span>
  <span class="material-icons next" id="next-btn" onclick="nextSong()">fast_rewind </span>
  <span class="material-icons" id="shuffle-btn" onclick="toggleShuffle()">shuffle</span>
  `;
  currentSongView.appendChild(controlls);
  const controllsElements = Array.from(controlls.children);
  controllsElements.forEach(element => {
    element.style.cursor = "pointer";
  });

  currentSongIndex = index;
}
//****************************************************************************************************
function playPauseSong(index) {
  if (currentSongIndex === index) {
    if (musicPlayer.paused) {
      musicPlayer.play();
    } else {
      musicPlayer.pause();
    }
  } else {
    playSong(index);
  }
}
//****************************************************************************************************

function updateProgressBar() {
  const progressBar = timeLineContainer.querySelector(
    'input[id="progress-bar"]'
  );
  const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
  progressBar.value = progress;
}
musicPlayer.addEventListener("timeupdate", updateProgressBar);

//**************************************************************************************************** */
let isLooping = false;
let isShuffling = false;

function toggleLoop() {
  isLooping = !isLooping;
  musicPlayer.loop = isLooping;
}
//****************************************************************************************************
// Function to toggle shuffle status
function toggleShuffle() {
  isShuffling = !isShuffling;
}
//**************************************************************************************************** */

// Update the nextSong function to consider looping and shuffling
function nextSong() {
  console.log(currentSongIndex);
  if (isShuffling) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    playSong(randomIndex);
  } else if (currentSongIndex < songs.length - 1) {
    playSong(currentSongIndex + 1);
  } else if (isLooping) {
    playSong(0);
  }
}
//**************************************************************************************************** */
function previousSong() {
  if (isShuffling) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    playSong(randomIndex);
  } else if (currentSongIndex > 0) {
    playSong(currentSongIndex - 1);
  } else {
    playSong(songs.length - 1);
  }
}
//**************************************************************************************************** */

displayPlaylist();
