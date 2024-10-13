console.log("lets write javascript");
let currentSong = new Audio();
let songs;
let currFolder;
// let play = document.getElementById("play");
// let previous = document.getElementById("previous");
// let next = document.getElementById("next");

console.log()


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(folder) {
    currFolder = folder;
    try {
        let a = await fetch(` http://127.0.0.1:5500/${folder}/`);
        
       
        // if (!a.ok) throw new Error(`Failed to load folder: ${folder}`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href.split(`/${folder}/`)[1]); // Get the song file name
            }
        }
        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = ""; // Clear song list
        for (const song of songs) {
            songUL.innerHTML += `
                <li>
                    <img class="invert" src="images/music.svg" alt="">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Rohan</div>
                    </div>
                    <div class="playnow">
                        <span> Play Now</span>
                        <img class="invert" src="images/play.svg" alt="">
                    </div>
                </li>`;
        }

        // Add click listeners to the songs
        Array.from(document.querySelectorAll(".songList li")).forEach(e => {
            e.addEventListener("click", () => {
                playMusic(e.querySelector(".info div").textContent.trim());
            });
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function displayAlbums() {
    
        console.log("display albums");
        let a = await fetch(" https://127.0.0.1:5500/songs");
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let anchors = div.getElementsByTagName("a");
        let cardContainer = document.querySelector(".cardContainer");
        let array = Array.from(anchors)

        for (let index = 0; index < array.length; index++) {
            const e = array[index];
          
            if (e.href.includes("/songs")) {
                
                // console.log(e.href.split("/").slice(-2))
                let folder = e.href.split("/").slice(-2)[0];
              
               
              // Correctly extract the folder name
              
                    let folderResponse = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
                    // if (!folderResponse.ok) throw new Error(`Failed to fetch info.json for folder: ${folder}`);
                    let json = await folderResponse.json();
                    cardContainer.innerHTML += `
                        <div data-folder="${folder}" class="card">
                            <div class="play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <img src="/songs/${folder}/cover.jpg" alt="">
                            <h2>${json.title}</h2>
                            <p>${json.description}</p>
                        </div>`;
                }
            }
        }

        // Set up event listeners for album cards
        Array.from(document.querySelectorAll(".card")).forEach(card => {
            card.addEventListener("click", async event => {
                console.log("Fetching songs");
                let folder = card.dataset.folder;
                songs = await getsongs(`songs/${folder}`);
                playMusic(songs[0]);
            });
        });
    




const playMusic = (track, pause = false) => {

    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "images/pause.svg"

    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"





}


  


async function  main() {


    await getsongs("songs/ncs")
    playMusic(songs[0], true)

    await displayAlbums()



    play.addEventListener("click", () => {


        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "images/play.svg"
        }

    })


    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })



    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })


    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })


    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })


    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("images/mute.svg", "images/volume.svg")
        }
    })


    document.querySelector(".volume>img").addEventListener("click", e => {

        if (e.target.src.includes("images/volume.svg")) {
            e.target.src = e.target.src.replace("images/volume.svg", "images/mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("images/mute.svg", "images/volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })




}

main()













