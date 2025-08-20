// Here in this file the address of the file is hardcoded to only check on port 3000 and only works with live preview(vs code own way) but not on live server (port 5500 or any different) so it is kind of port deficient, i wont be able to deploy it in future as an online web

console.log("Let's write JavaScript")
let currentSong = new Audio()
let songs
let currFolder
let lastVolume = 1;
function displaySongs(songsList) {
    let songUL = document.querySelector(".songs");
    songUL.innerHTML = ""
    // Use forEach to get both the song and its index and show all the songs in the playlist

    songs.forEach((song, index) => {
        let songName = song.split("-")[0].trim();
        let songArtist = song.split("-")[1].trim();
        let imageNumber = (index % 11) + 1;

        // Add data-songfile="${song}" to the main div
        songUL.innerHTML += `<div class="song" data-songfile="${song}">
      <div class="song_info">
        <img height="60" src="images/image${imageNumber}.png" alt="" />
        <div class="info">
        <p>${songName}</p>
        <p>${songArtist}</p>
        </div>
      </div>
      <div class="play"><img width="50" src="svg/play.svg" alt="" /></div>
    </div>`;
    });

    // Attach click listeners to the NEW song elements
    Array.from(document.querySelector(".songs").getElementsByClassName("song")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(`/${currFolder}/` + e.dataset.songfile + ".mp3");
        });
    });
    playMusic((`http://127.0.0.1:3000/${currFolder}/` + songs[0] + ".mp3").trim(), true)

}
async function getSongs(folder) {
    currFolder = folder
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]
                .replace("%20", " ")
                .replace(".mp3", ""));
        }
    }


}
function playMusic(track, pause = false) {
    // Set the source for the new song
    currentSong.src = track;

    // Update the song name display in the playbar
    document.getElementById("songNA").innerHTML = decodeURIComponent(track.split(`/${currFolder}/`)[1].replace(".mp3", ""));

    // Only play the song if pause is false
    if (!pause) {
        currentSong.play();
        document.getElementById('playIcon').src = "svg/pause.svg";
    }
    // If pause is true, we just load the song and ensure the icon shows "play"
    else {
        document.getElementById('playIcon').src = "svg/play.svg";
    }
}

// Helper function to format time in mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/songs/")[1].replace("/", "")
            //Get the metadata of the folder
            let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let response = await a.json()
            let cards = document.querySelector(".cards")
            cards.innerHTML += `<div data-folder="${folder}" class="card">
            <img src="songs/${folder}/cover.png" alt="" />
            <h4>${response.title}</h4>
            <p>${response.description}</p>
            </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            displaySongs(songs); // Call it again here to update the UI
        });
    });

}



async function main() {
    // Get the lists of all the songs
    await getSongs("songs/cs");
    playMusic((`http://127.0.0.1:3000/${currFolder}/` + songs[0] + ".mp3").trim(), true)


    let songUL = document.querySelector(".songs");
    songUL.innerHTML = ""
    // Use forEach to get both the song and its index and show all the songs in the playlist

    songs.forEach((song, index) => {
        let songName = song.split("-")[0].trim();
        let songArtist = song.split("-")[1].trim();
        let imageNumber = (index % 11) + 1;

        // Add data-songfile="${song}" to the main div
        songUL.innerHTML += `<div class="song" data-songfile="${song}">
      <div class="song_info">
        <img height="60" src="images/image${imageNumber}.png" alt="" />
        <div class="info">
        <p>${songName}</p>
        <p>${songArtist}</p>
        </div>
      </div>
      <div class="play"><img width="50" src="svg/play.svg" alt="" /></div>
    </div>`;
    });
    // Attach an eventlistener to each song
    let allSongs = document.querySelectorAll(".songs .song");

    allSongs.forEach(song => {
        song.addEventListener("click", () => {
            // Get the filename from the data attribute
            const songFile = song.dataset.songfile;

            // Construct the full, correct path and play it
            playMusic(`/${currFolder}/` + songFile + ".mp3");
        });
    });
    // Attach an event Listener to the previous,play,next buttons

    playPauseBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            playIcon.src = "svg/pause.svg"
        } else {
            currentSong.pause()
            playIcon.src = "svg/play.svg"

        }

    })
    // Add an event listener to previous and next
    prevBtn.addEventListener("click", () => {
        let U = currentSong.src.split(`/${currFolder}/`)[1].replaceAll("%20", " ")
            .replace(".mp3", "");
        let index = songs.indexOf(U)
        if ((index - 1) >= 0) {
            playMusic((`http://127.0.0.1:3000/${currFolder}/` + songs[index - 1] + ".mp3").replace("%20", ""))
        }
    })
    nextBtn.addEventListener("click", () => {
        let U = currentSong.src.split(`/${currFolder}/`)[1].replaceAll("%20", " ")
            .replace(".mp3", "");
        let index = songs.indexOf(U)

        if ((index + 1) < songs.length) {
            playMusic((`http://127.0.0.1:3000/${currFolder}/` + songs[index + 1] + ".mp3").replace("%20", ""))
        }

    })
    // Attach an event listener to update the time and seek bar
    currentSong.addEventListener("timeupdate", () => {
        let duration = currentSong.duration;
        let currentTime = currentSong.currentTime;

        // Update time spans
        document.getElementById("currentTime").innerText = formatTime(currentTime);
        document.getElementById("totalDuration").innerText = formatTime(duration);

        // Update seek bar position
        if (duration) {
            let percent = (currentTime / duration) * 100;
            document.getElementById("seekBar").value = percent;
        }
    });
    // Using 'input' for a live update effect
    seekBar.addEventListener("input", () => {
        if (currentSong && currentSong.duration) {
            const seekValue = seekBar.value;
            const newTime = (currentSong.duration * seekValue) / 100;
            currentSong.currentTime = newTime;
        }
    });
    // Get references to the volume bar and the volume icon button
    const volumeBar = document.getElementById("volumeBar");
    const volumeBtn = document.querySelector(".right .icon-btn"); // Assuming this is the volume button
    const volumeIcon = volumeBtn.querySelector("svg"); // Get the SVG inside the button

    // Add an event listener to the volume slider
    volumeBar.addEventListener("input", () => {
        // Set the song's volume
        currentSong.volume = volumeBar.value / 100;

        // Check the volume level and update the icon
        if (currentSong.volume === 0) {
            // Change the SVG path to your mute icon
            volumeIcon.querySelector("path").setAttribute("d", "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");
        } else {
            // Change it back to the regular volume icon path
            volumeIcon.querySelector("path").setAttribute("d", "M5 9v6h4l5 5V4l-5 5H5z");
        }
    });
    volumeBtn.addEventListener("click", e => {
        // Check if the song is currently muted
        if (currentSong.muted) {
            // --- UNMUTE LOGIC ---
            currentSong.muted = false;

            // Restore the volume to its last known level
            currentSong.volume = lastVolume;

            // Update the slider bar to match the restored volume
            volumeBar.value = lastVolume * 100;

            // Change the icon back to the regular volume icon
            volumeIcon.querySelector("path").setAttribute("d", "M5 9v6h4l5 5V4l-5 5H5z");

        } else {
            // --- MUTE LOGIC ---
            // Remember the current volume before setting it to 0
            lastVolume = currentSong.volume;

            currentSong.muted = true;

            // Even though it's muted, also set volume property for consistency
            currentSong.volume = 0;

            // Move the slider bar to the beginning
            volumeBar.value = 0;

            // Change the icon to the mute icon
            volumeIcon.querySelector("path").setAttribute("d", "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");
        }
    });
    // Display all the songs album
    displayAlbums()




}

main();