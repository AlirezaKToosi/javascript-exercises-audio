// Example song data
const songs = [
    { name: 'Say_Goodbye', artist: 'VITNE', album: 'Jupiter', image: 'Say_Goodbye_-_VITNE.jpg', file: 'Say_Goodbye_-_VITNE.mp3' },
    { name: 'Peyote', artist: 'Kinematic', album: 'kites', image: 'Peyote_-_Kinematic.jpg', file: 'Peyote_-_Kinematic.mp3' },
];

//****************************************************************************************************
function displayPlaylist() {
    const playlistView = document.getElementById("playlist-view");
    playlistView.innerHTML = "";
    songs.forEach((song, index) => {
        const songItem = document.createElement("div");
        
        songItem.innerHTML = `<img src="assets/${song.image}" alt="${song.album}"><p>${song.name} - ${song.artist}</p>`;
        songItem.addEventListener("click", () => playSong(index));
        playlistView.appendChild(songItem);
    });
}
//****************************************************************************************************
const musicPlayer = document.getElementById("music-player");
const currentSongView = document.getElementById("current-song-view");
let currentSongIndex = -1;

function playSong(index) {
    // Pause current song
    if (currentSongIndex !== -1 && currentSongIndex !== index) {
        musicPlayer.pause();
    }
    musicPlayer.src = `assets/${songs[index].file}`;
    musicPlayer.play();
    // UI
    currentSongView.innerHTML = `<img src="assets/${songs[index].image}" alt="${songs[index].album}"><p>${songs[index].name} - ${songs[index].artist}</p>`;
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
const progressBar = document.getElementById("progress-bar");

function updateProgressBar() {
    const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
    progressBar.value = progress;
}

// Add event listener to update the progress bar during playback
musicPlayer.addEventListener("timeupdate", updateProgressBar);

//**************************************************************************************************** */
let isLooping = false;
let isShuffling = false;

function toggleLoop() {
    isLooping = !isLooping;
    musicPlayer.loop = isLooping;
}

// Function to toggle shuffle status
function toggleShuffle() {
    isShuffling = !isShuffling;
}
//**************************************************************************************************** */

// Update the nextSong function to consider looping and shuffling
function nextSong() {
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
