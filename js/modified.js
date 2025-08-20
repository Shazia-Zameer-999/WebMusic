console.log("Let's write JavaScript");

let currentSong = new Audio();

let songs;

let currFolder;

let lastVolume = 1;





async function getSongs(folder) {

    currFolder = folder;

    // CORRECT: Path is relative to the server root.

    let a = await fetch(`/${folder}/`);

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    songs = [];

    for (let i = 0; i < as.length; i++) {

        const element = as[i];

        if (element.href.endsWith(".mp3")) {

            songs.push(element.href.split(`/${folder}/`)[1]

                .replaceAll("%20", " ")

                .replace(".mp3", ""));

        }

    }

}



// Replace your existing playMusic function with this one

function playMusic(track, pause = false) {

    currentSong.src = track;

    document.getElementById("songNA").innerHTML = decodeURIComponent(track.split('/').pop().replace(".mp3", ""));



    // Get references to the SVG elements

    const playIcon = document.getElementById('playIcon');

    const pauseIcon = document.getElementById('pauseIcon');



    if (!pause) {

        currentSong.play();

        // Hide the play icon and show the pause icon

        playIcon.style.display = 'none';

        pauseIcon.style.display = 'block';

    } else {

        // Hide the pause icon and show the play icon

        playIcon.style.display = 'block';

        pauseIcon.style.display = 'none';

    }

}







async function displayAlbums() {

    // CORRECT: Path is relative to the server root.

    let a = await fetch(`/songs/`);

    let response = await a.text();

    let div = document.createElement("div");

    div.innerHTML = response;

    let anchors = div.getElementsByTagName("a");

    let cardContainer = document.querySelector(".cards");

    cardContainer.innerHTML = "";



    for (const e of Array.from(anchors)) {

        if (e.href.includes("/songs/") && !e.href.endsWith(".json") && !e.href.endsWith(".png")) {

            let folder = e.href.split("/songs/").pop().replace("/", "");

            if (folder) {

                // CORRECT: Path is relative to the server root.

                let metaResponse = await fetch(`/songs/${folder}/info.json`);

                let responseData = await metaResponse.json();



                // FINAL FIX: The image src now also starts with "/"

                cardContainer.innerHTML += `<div data-folder="${folder}" class="card">

<img src="/songs/${folder}/cover.png" alt="Cover for ${responseData.title}" />

<h4>${responseData.title}</h4>

<p>${responseData.description}</p>

</div>`;

            }

        }

    }



    Array.from(document.getElementsByClassName("card")).forEach(e => {

        e.addEventListener("click", async item => {

            await getSongs(`songs/${item.currentTarget.dataset.folder}`);

            displaySongs(songs);

            playMusic(`/${currFolder}/${songs[0]}.mp3`);



        });

    });

    // playMusic(`/${currFolder}/${songs[0]}.mp3`, true);



}



function displaySongs(songsList) {

    let songUL = document.querySelector(".songs");

    songUL.innerHTML = "";



    songsList.forEach((song, index) => {

        let songName = song.split("-")[0].trim();

        let songArtist = song.split("-")[1]?.trim() || "Unknown Artist";

        let imageNumber = (index % 11) + 1;



        songUL.innerHTML += `<div class="song" data-songfile="${song}">

<div class="song_info">

<img height="60" src="/images/image${imageNumber}.png" alt="" />

<div class="info">

<p>${songName}</p>

<p>${songArtist}</p>

</div>

</div>

<div class="play"><img width="50" src="svg/play.svg" alt="" /></div>

</div>`;

    });



    Array.from(document.querySelector(".songs").getElementsByClassName("song")).forEach(e => {

        e.addEventListener("click", () => {

            playMusic(`/${currFolder}/${e.dataset.songfile}.mp3`);

        });

    });

    playMusic(`/${currFolder}/${songs[0]}.mp3`, true);





}



function formatTime(seconds) {

    if (isNaN(seconds) || seconds < 0) return "00:00";

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

}



// Replace your existing main function with this one

async function main() {

    // --- Get references to the player buttons at the top ---

    const playPauseBtn = document.getElementById("playPauseBtn");

    const playIcon = document.getElementById('playIcon');

    const pauseIcon = document.getElementById('pauseIcon');

    const prevBtn = document.getElementById("prevBtn");

    const nextBtn = document.getElementById("nextBtn");



    await getSongs("songs/cs");

    displaySongs(songs);



    if (songs.length > 0) {

        playMusic(`/${currFolder}/${songs[0]}.mp3`, true);

    }



    // --- Updated click listener with the correct logic ---

    playPauseBtn.addEventListener("click", () => {

        if (currentSong.paused) {

            currentSong.play();

            playIcon.style.display = 'none';

            pauseIcon.style.display = 'block';

        } else {

            currentSong.pause();

            playIcon.style.display = 'block';

            pauseIcon.style.display = 'none';

        }

    });



    prevBtn.addEventListener("click", () => {

        let currentSongName = decodeURIComponent(currentSong.src.split('/').pop()).replace(".mp3", "");

        let index = songs.indexOf(currentSongName);

        if (index > 0) {

            playMusic(`/${currFolder}/${songs[index - 1]}.mp3`);

        }

    });



    nextBtn.addEventListener("click", () => {

        let currentSongName = decodeURIComponent(currentSong.src.split('/').pop()).replace(".mp3", "");

        let index = songs.indexOf(currentSongName);

        if (index < songs.length - 1) {

            playMusic(`/${currFolder}/${songs[index + 1]}.mp3`);

        }

    });



    currentSong.addEventListener("timeupdate", () => {

        document.getElementById("currentTime").innerText = formatTime(currentSong.currentTime);

        document.getElementById("totalDuration").innerText = formatTime(currentSong.duration);

        if (currentSong.duration) {

            seekBar.value = (currentSong.currentTime / currentSong.duration) * 100;

        }

    });



    seekBar.addEventListener("input", () => {

        if (currentSong.duration) {

            currentSong.currentTime = (seekBar.value * currentSong.duration) / 100;

        }

    });



    const volumeBar = document.getElementById("volumeBar");

    const volumeBtn = document.querySelector(".right .icon-btn");

    const volumeIcon = volumeBtn.querySelector("svg");



    volumeBar.addEventListener("input", () => {

        currentSong.volume = volumeBar.value / 100;

        if (currentSong.volume === 0) {

            volumeIcon.querySelector("path").setAttribute("d", "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");

        } else {

            volumeIcon.querySelector("path").setAttribute("d", "M5 9v6h4l5 5V4l-5 5H5z");

        }

    });



    volumeBtn.addEventListener("click", () => {

        if (currentSong.muted) {

            currentSong.muted = false;

            currentSong.volume = lastVolume;

            volumeBar.value = lastVolume * 100;

            volumeIcon.querySelector("path").setAttribute("d", "M5 9v6h4l5 5V4l-5 5H5z");

        } else {

            lastVolume = currentSong.volume;

            currentSong.muted = true;

            currentSong.volume = 0;

            volumeBar.value = 0;

            volumeIcon.querySelector("path").setAttribute("d", "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");

        }

    });



    await displayAlbums();



    document.querySelector(".home").addEventListener("click", e => {

        console.log(e.target)

    })

}

document.addEventListener("DOMContentLoaded", () => {

    const themesBtn = document.querySelector(".themes");

    const themeDropdown = document.querySelector(".theme-dropdown");

    const themeLink = document.getElementById("theme-link");



    // --- 1. Function to get all theme CSS files from the /themes/ directory ---

    async function getThemes() {

        // We use fetch on the folder itself, which works because your server provides a directory listing!

        const response = await fetch('/themes/');

        const text = await response.text();



        // Create a temporary div to parse the HTML response

        const div = document.createElement('div');

        div.innerHTML = text;



        // Find all links that point to a .css file

        const aTags = div.getElementsByTagName('a');

        const themeFiles = [];

        for (let a of aTags) {

            if (a.href.endsWith('.css')) {

                themeFiles.push(a.href.split('/').pop()); // Get just the filename

            }

        }

        console.log(themeFiles)

        return themeFiles;

    }



    // --- 2. Function to create the dropdown items ---

    function populateDropdown(themes) {

        const ul = themeDropdown.querySelector('ul');

        ul.innerHTML = ''; // Clear any existing items



        themes.forEach(themeFile => {

            const li = document.createElement('li');

            // Create a user-friendly name from the filename

            const themeName = themeFile.replace('.css', '').replace(/([A-Z])/g, ' $1').trim();

            li.innerText = themeName;

            li.dataset.theme = themeFile; // Store filename in a data attribute

            ul.appendChild(li);

        });

    }



    // --- 3. Logic to show/hide the dropdown ---

    // And REPLACE it with this new code:

    themesBtn.addEventListener("click", (event) => {

        event.stopPropagation(); // Prevents the window click listener from immediately hiding it



        // Get the position of the "Themes" button on the page

        const rect = themesBtn.getBoundingClientRect();



        // Position the dropdown right below the button

        // We add window.scrollX/Y to account for page scrolling

        themeDropdown.style.left = `${rect.left + window.scrollX}px`;

        themeDropdown.style.top = `${rect.bottom + window.scrollY + 5}px`; // Added 5px for a small gap



        // Finally, toggle the dropdown's visibility

        themeDropdown.classList.toggle("hidden");

    });



    // Hide dropdown if user clicks anywhere else

    window.addEventListener("click", () => {

        if (!themeDropdown.classList.contains("hidden")) {

            themeDropdown.classList.add("hidden");

        }

    });



    // --- 4. Logic to change the theme when an item is clicked ---

    themeDropdown.addEventListener("click", (event) => {

        if (event.target.tagName === 'LI') {

            const chosenTheme = event.target.dataset.theme;

            themeLink.href = `/themes/${chosenTheme}`;

            // Optional: Save the chosen theme so it persists on page reload

            localStorage.setItem('selectedTheme', chosenTheme);

        }

    });



    // --- 5. Main function to initialize everything ---

    async function initializeThemeSwitcher() {

        // Optional: Check if a theme was saved in localStorage from a previous visit

        const savedTheme = localStorage.getItem('selectedTheme');

        if (savedTheme) {

            themeLink.href = `/themes/${savedTheme}`;

        }



        const themes = await getThemes();

        populateDropdown(themes);

    }



    initializeThemeSwitcher();

    // --- Hamburger Menu Functionality ---

    const hamburger = document.querySelector(".hamburger");

    const navLinks = document.querySelector(".nav-links");



    hamburger.addEventListener("click", () => {

        // Toggle the 'nav-active' class to slide the menu in/out

        navLinks.classList.toggle("nav-active");



        // Toggle the 'toggle' class to animate the hamburger icon

        hamburger.classList.toggle("toggle");

    });

    initializeSearch();
    // --- "About Us" Panel Functionality ---

    // This code should be placed after your DOMContentLoaded listener or at the end of your file

    const aboutBtn = document.querySelector(".about");
    const aboutPanel = document.getElementById("about-panel");
    const closeAboutBtn = document.getElementById("close-about-btn");
    const overlay = document.getElementById("overlay");

    if (aboutBtn && aboutPanel && closeAboutBtn && overlay) {
        // Function to open the panel
        const openPanel = () => {
            aboutPanel.classList.add("active");
            overlay.classList.remove("hidden");
        };

        // Function to close the panel
        const closePanel = () => {
            aboutPanel.classList.remove("active");
            overlay.classList.add("hidden");
        };

        // Event Listeners
        aboutBtn.addEventListener("click", openPanel);
        closeAboutBtn.addEventListener("click", closePanel);
        overlay.addEventListener("click", closePanel); // Also close when clicking the overlay
    }
    /* --- And replace it with this: --- */
    const homeBtn = document.querySelector(".home");

    homeBtn.addEventListener("click", () => {
        // This command reloads the current page, just like hitting the browser's refresh button.
        location.reload();
    });
    // --- "Listen Now" Button Functionality (Play Featured Album) ---
    const listenNowBtn = document.querySelector(".listenNowBtn");

    listenNowBtn.addEventListener("click", async () => {
        // Load the songs from your main featured album
        await getSongs("songs/cs");

        // Display that album's song list
        displaySongs(songs);

        // Immediately play the first song from that list
        if (songs.length > 0) {
            playMusic(`/${currFolder}/${songs[0]}.mp3`);
        }
    });


});



main();

// --- Live Search Functionality ---

function initializeSearch() {

    const searchInput = document.getElementById("searchInput");

    const albumContainer = document.querySelector(".cards");



    // This function will be called every time the user types

    const handleSearch = () => {

        // 1. Get the user's query, make it lowercase for case-insensitive matching

        const query = searchInput.value.toLowerCase().trim();



        // 2. Filter the "Featured Albums"

        const albums = albumContainer.querySelectorAll(".card");

        albums.forEach(card => {

            const title = card.querySelector("h4").innerText.toLowerCase();

            const description = card.querySelector("p").innerText.toLowerCase();



            // If the title or description includes the query, show the card. Otherwise, hide it.

            if (title.includes(query) || description.includes(query)) {

                card.style.display = 'block'; // Or 'flex', 'grid' if you use that

            } else {

                card.style.display = 'none';

            }

        });



        // 3. Filter the currently displayed song list

        // We check if the global 'songs' array exists first

        if (window.songs && Array.isArray(window.songs)) {

            const filteredSongs = window.songs.filter(song => {

                // We assume the song filename contains the title and artist

                return song.toLowerCase().includes(query);

            });



            // We reuse your existing displaySongs function to render the filtered list!

            displaySongs(filteredSongs);

        }

    };



    // Listen for the 'input' event, which fires every time the user types

    searchInput.addEventListener("input", handleSearch);

}

