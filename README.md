<div align="center">
  
  
  <h1 align="center">
    <a href="https://github.com/Shazia-Zameer-999/your-repo-name">
      <img src="https://readme-typing-svg.herokuapp.com?font=Geist&size=40&pause=1000&color=9542f5&center=true&vCenter=true&width=550&lines=Web+Music+%F0%9F%8E%B5;Your+Personal+Music+Oasis" alt="Web Music Typing Animation" />
    </a>
  </h1>
  
  <p align="center">
    <strong>A sleek, dynamic, and themeable music player built with 100% Vanilla JavaScript.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge"/>
    <img src="https://img.shields.io/badge/Made%20with-Love-ff69b4.svg?style=for-the-badge" alt="Made with Love Badge"/>
  </p>
</div>

---

## ✨ Overview

Web Music is a feature-rich music player built from the ground up without any frameworks. It automatically discovers your music library from a simple folder structure, provides a beautiful interface to browse and play your favorite tunes, and offers powerful features like live theme switching and real-time search.

<br>

<div align="center">
  <img src="/svg/playBtn.svg" style="border-radius: 10px;"/>
</div>
<div align="center">
  <img src="/svg/layout.png" style="border-radius: 10px;"/>
</div>

---

## 🚀 Core Features

This project is packed with functionality to provide a seamless and enjoyable listening experience.

### Player & Library Functionality
* 🎶 **Dynamic Music Discovery**: Automatically scans the `/songs/` directory to find and display your albums.
* 🎧 **Full Playback Controls**: Includes play, pause, next, previous, and a visual seek bar.
* 🔊 **Volume Control**: Adjust the volume with a slider and a one-click mute/unmute button that remembers the last volume level.
* 📝 **Dynamic Song Lists**: Clicking an album fetches and displays all its songs in a clean, scrollable list.
* ℹ️ **Real-time Track Info**: The player always shows the name of the currently playing song.

### UI & UX Features
* 🎨 **Live Theme Switcher**: Instantly change the application's appearance by selecting from dynamically loaded CSS themes. Your preference is saved in `localStorage`!
* 🔍 **Instant Search**: A powerful search bar filters albums and the current song list in real-time as you type.
* 📱 **Fully Responsive Design**: A clean, modern UI that adapts beautifully to all screen sizes, from mobile phones to desktops, thanks to its hamburger menu and flexible layout.
* sliding side panel that provides details about the project.
* 🚀 **Zero Dependencies**: Built with 100% pure, framework-less Vanilla JavaScript for maximum performance and minimum bloat.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | `HTML5`, `CSS3`, `JavaScript (ES6+)` |
| Core JS  | `Async/Await`, `Fetch API`, `DOM Manipulation` |
| Features | `localStorage API` for theme persistence |

---

## 📂 Project Structure

To add your own music, you must follow this specific folder structure. The application relies on it to find your albums, metadata, and songs.

```
/
├── index.html
├── script.js
├── style.css
├── images/
├── svg/
├── themes/
│   ├── DarkPurple.css
│   ├── Light.css
│   └── ... (add more theme files here)
│
└── songs/
    ├── AlbumName1/
    │   ├── info.json
    │   ├── cover.png
    │   ├── song1-artist.mp3
    │   └── song2-artist.mp3
    │
    └── AlbumName2/
        ├── info.json
        ├── cover.png
        ├── trackA-artist.mp3
        └── trackB-artist.mp3
```

**Important Notes:**
* Each album **must** be in its own folder inside `/songs/`.
* Each album folder **must** contain a `cover.png` for the album art.
* Each album folder **must** contain an `info.json` file with the following format:
    ```json
    {
      "title": "Your Album Title",
      "description": "A short, catchy description for your album."
    }
    ```

---

## 🏃‍♀️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
You need a local web server to run this project because the `fetch` API does not work with the `file:///` protocol. The easiest way is to use the **Live Server** extension in Visual Studio Code.

### Installation
1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Shazia-Zameer-999/your-repo-name.git](https://github.com/Shazia-Zameer-999/your-repo-name.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Launch with a local server:**
    * If you have the **Live Server** VSCode extension, simply right-click `index.html` and choose "Open with Live Server".

That's it! The application should now be running in your browser.

---

[![Shazia Zameer's GitHub stats](https://github-readme-stats.vercel.app/api?username=Shazia-Zameer-999&show_icons=true&theme=dracula)](https://github.com/anuraghazra/github-readme-stats)
---


[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Shazia-Zameer-999&layout=compact&theme=dracula)](https://github.com/anuraghazra/github-readme-stats)

![GitHub last commit](https://img.shields.io/github/last-commit/Shazia-Zameer-999/PassOP-Password-Manager)

![GitHub Repo stars](https://img.shields.io/github/stars/Shazia-Zameer-999/PassOP-Password-Manager?style=social)

[![trophy](https://github-profile-trophy.vercel.app/?username=Shazia-Zameer-999&theme=dracula&column=7)](https://github.com/ryo-ma/github-profile-trophy)


<div align="center">
  <h3>Built with ❤️ by Daten Diva </h3>
</div>
