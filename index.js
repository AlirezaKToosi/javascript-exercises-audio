// Example song data
const songs = [
    { name: 'Say_Goodbye', artist: 'VITNE', album: 'Jupiter', image: 'Say_Goodbye_-_VITNE.jpg', file: 'Say_Goodbye_-_VITNE.mp3' },
    { name: 'Peyote', artist: 'Kinematic', album: 'kites', image: 'Peyote_-_Kinematic.jpg', file: 'Peyote_-_Kinematic.mp3' },
    { name: 'Old_News', artist: 'Hot_Fiction', album: 'Apply within', image: 'Old_News_-_Hot_Fiction.jpg', file: 'Old_News_-_Hot_Fiction.mp3' },
    { name: 'Not_My_Problem', artist: 'All_My_Friends_Hate_Me', album: 'kites', image: 'Not_My_Problem_-_All_My_Friends_Hate_Me.jpg', file: 'Not_My_Problem_-_All_My_Friends_Hate_Me.mp3' },
    { name: 'Higher_And_Higher', artist: 'Inception', album: 'kites', image: 'Higher_And_Higher_-_Scream_Inc._(3).jpg', file: 'Higher_And_Higher_-_Scream_Inc._(3).mp3' },
    { name: 'Boys,_Girls,_Toys_&_Words', artist: 'Modern_Pitch', album: 'Eye of the storm', image: 'Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg', file: 'Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3' },
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
