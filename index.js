// Example song data
const songs = [
    { name: 'Say_Goodbye', artist: 'VITNE', album: 'Jupiter', image: 'Say_Goodbye_-_VITNE.jpg', src: 'assets/Say_Goodbye_-_VITNE.mp3' },
    { name: 'Peyote', artist: 'Kinematic', album: 'kites', image: 'Peyote_-_Kinematic.jpg', src: 'assets/Peyote_-_Kinematic.mp3' },
];


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

displayPlaylist();
