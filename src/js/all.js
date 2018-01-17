
/**
 * @class Layouter
 * @description Add and remove the html classes in function of the active players
 *              
 */

class Layouter{
    constructor(){
        this.player1 = null;
        this.player2 = null;
        this.player3 = null;
        this.player4 = null;
        this.init()
    }

    init() {
        this.player1 = document.getElementById('video1-container');
        this.player2 = document.getElementById('video2-container');
        this.player3 = document.getElementById('video3-container');
        this.player4 = document.getElementById('video4-container');
        this.players = [this.player1,
                        this.player2,
                        this.player3,
                        this.player4]
        console.log(this.players)
    }
    
    setLayout(playerStatus) {
        let indexToShow = new Array()
        let indexToHide = new Array()
        let counter = 0
        for (const pl of playerStatus) {
            if (pl==true){
                indexToShow.push(counter)
            } else {
                indexToHide.push(counter)
            }
            counter += 1
        }
        switch (indexToShow.length) {
            case 1:
                this.setOneVideoLayout(indexToShow, indexToHide)
                break
            case 2:
                this.setTwoVideoLayout(indexToShow, indexToHide)
                break
            case 3:
                this.setTreeVideoLayout(indexToShow, indexToHide)
                break
            case 4:
                this.setFourVideoLayout(indexToShow, indexToHide)
                break
            default:
                console.log('error')
                return;
            }

    }

    setOneVideoLayout(indexToShow, indexToHide) {
        this.players[indexToShow[0]].className = 'onevideo'
        this.players[indexToHide[0]].className = 'hide'
        this.players[indexToHide[1]].className = 'hide'
        this.players[indexToHide[2]].className = 'hide'
    }
    setTwoVideoLayout(indexToShow, indexToHide) {
        this.players[indexToShow[0]].className = 'twovideos1'
        this.players[indexToShow[1]].className = 'twovideos2'
        this.players[indexToHide[0]].className = 'hide'
        this.players[indexToHide[1]].className = 'hide'
    }
    setTreeVideoLayout(indexToShow, indexToHide) {
        this.players[indexToShow[0]].className = 'treevideos1'
        this.players[indexToShow[1]].className = 'treevideos2'
        this.players[indexToShow[2]].className = 'treevideos3'
        this.players[indexToHide[0]].className = 'hide'
    }
    setFourVideoLayout(indexToShow, indexToHide) {
        this.players[indexToShow[0]].className = ' '
        this.players[indexToShow[1]].className = ' '
        this.players[indexToShow[2]].className = ' '
        this.players[indexToShow[3]].className = ' '
    }

    playButton(playing) {
        if (playing==true) {
            document.getElementById('playButton').innerText = 'pause_circle_filled'
        } else {
            document.getElementById('playButton').innerText = 'play_circle_filled'
        }
    }
    muteButton(muted) {
        if (muted == true) {
            document.getElementById('muteButton').innerText = 'mic_off'
        } else {
            document.getElementById('muteButton').innerText = 'mic'
        }
    }

}

// function getIndexArray(element,index,array) {
//     let indexArray = new Array()
//     indexArray.push(index)
//     console.log(index)
//     return indexArray
// }
/* TODO: 

js class to controll the video players
Add all the hmtl dinamically with js so it can be 
the MainAudio audio should control the global state of the video player
    - duration
    - autoplay
    
when a video is added we should call seek for the video when is ready
using a promise call
*/

/**
 * @class VideoController
 * @description The video controller allows you to control x videos and 1 main audio
 */
class VideoController {
    /**
     * Create a VideoController
     * @param {string} root_name 
     * @param {number} globalTime 
     * @param {boolean} controllerMuted 
     * @param {number} startTime 
     * @param {number} endTime 
     * @param {boolean} controllerPlaying 
     */
    constructor(root_name = 'root',
        controllerMuted = false,
        controllerPlaying = false,
        endTime = null,
        globalTime = 0,
        startTime = 0
        ) {
        this.canPlayCount = 0;
        this.controllerMuted = controllerMuted;
        this.endTime = endTime;
        this.isReady = false;
        this.globalTime = globalTime;
        this.mainAudio = null;
        this.players = [];
        this.root_name = root_name;
        this.startTime = startTime;
        this.activePlayers = 0;
        this.playerStatus = [false,false,false,false]
        // this.init();
    }
    /**
     * ---------------- INIT ----------------
     * create the MediaPlayers
     */
    init() {
        // create and append the video elements on the root element
        // Main Audio
        this.mainAudio = dashjs.MediaPlayer().create();
        this.mainAudio.on('canPlay',function () {
            this.isReady = true
        }.bind(this));
        this.canPlayCount += 1;
        //  - 4 video tags
        const n = 4;
        for (let i = 0; i < n; i++) {
            this.players.push(dashjs.MediaPlayer().create())
        };
    }

    // AVAILABLE METHODS GO BEYOND THIS LINE  
    
    /**
     * get the html video element for the selected slot,
     * initialize and load the media source from the url.
     * @param {number} slot 
     * @param {string} url 
     */
    // TODO : raise error when video element with id='video{slot}' doesn't exist 
    add(slot, url) {

        let html_vid_element = document.querySelector(`#video${slot}`)
        this.players[slot].initialize(html_vid_element, url, false)
        return new Promise((resolve, reject) => {
            if (this.players[slot].isReady()) {
                resolve(console.log(`ready vid${slot}`));
            }
        })
    }

    /**
     * get the html audio element for the MainAudio,
     * initialize and loads the media source from the url.
     * 
     * @param {string} url to the media source
     */
    // TODO : raise error when video element with id='mainAudio' doesn't exist 
    addMainAudio(url) {
        
        let html_vid_element = document.querySelector(`#mainAudio`)
        console.log(html_vid_element)
        this.mainAudio.initialize(html_vid_element,url,false);
    }

    /**
     * Calculate the duration of the video in function of the initial values
     * @returns {number} the duration of the VideoController
     */
    duration() {
        if (this.endTime == null) {
            return this.mainAudio.duration() - this.startTime
        } else {
            return this.endTime - this.startTime
        }
    }
    
    /**
     * get the reference time for all the players
     * 
     * @returns {number} the reference time 
     */
    getTime() {
        return this.mainAudio.time();
    }
    
    /**
     * get the advance percentaje based in the predefined duration of the videos.
     */
    getVideoAdvancePercentage() {

        return advance
    }

    /**
     * Unmute the main audio and mute every other player
     */
    onlyMainAudio() {
        this.controllerMuted = true;
        for (const player of this.players) {
            try {
                player.setMute(this.controllerMuted);
            } catch (e) { }
        };
        this.mainAudio.setMute(false);
    }

    /**
     * Pause all the active players
     */
    pause() {
        this.mainAudio.pause();

        for (const player of this.players) {
            try {
                player.pause();
            } catch (e) { }
        };
    }

    /**
     * Analize the status of the players, returns an boolean array wiht the status of the videos
     */
    getPlayerStatus() {
        let i = 0
        for (const player of this.players) {
            console.log(this.playerStatus)
            this.playerStatus[i] = player.isReady()
            i += 1
            console.log(this.playerStatus, i)
        }
        return this.playerStatus
    }
    /**
     * Remove the media source from a video
     * 
     * @param {number} slot the slot number to be removed
     */
    remove(slot) {
        let ele = this.players[slot];
        ele.attachSource('');
    }


    /**
     * seek the value for all the active players
     * @param {number} value 
     */
    seek(value) {
        this.mainAudio.seek(value);
        for (const player of this.players) {
            try {
                player.seek(value);
            } catch (e) { }
        };
    }

    /**
     * seek backwards x seconds for all players
     * @param {number} x
     */
    seekBackward(x) {
        if (this.globalTime <= x) {
            this.globalTime = 0;
        } else {
            this.globalTime -= x;
        }
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
        this.mainAudio.seek(this.globalTime);
    }

    /**
     * seek forward x seconds for all players
     * @param {number} x 
     */
    seekForward(x) {
        this.globalTime += x;
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
        this.mainAudio.seek(this.globalTime);
    }

    /**
     * set the media source to the selected slot
     * 
     * @param {number} slot the slot number 
     * @param {string} url the media source url 
     */
    // TODO : 1 - add the source in the right time, using media queries?
    //        2 - wait until source is loaded an ready
    //        3 - syncro with the current time 
    setSource(slot, url) {
        // let buildedUrl = buildMediaQueryUrlSource(url,this.getTime());
        // console.log(buildedUrl);
        this.players[slot].attachSource(url);
    }

    
    /**
     * Toogle the video audio status between mute/unmute
     * 
     * @param {number} slot - the position of the video in the layout
     * @returns {boolean} - the final status of the video
     */
    toogleIndividualMuteAudio(slot) {
        let selectedPlayer = this.players[slot-1]
        if (selectedPlayer.isMuted()) {
            selectedPlayer.setMute(false);
            return false
        } else {
            selectedPlayer.setMute(true);
            return true
        }
    }

    /**
     * Changes the global state of muted for all active players
     */
    toogleGlobalMute() {
        // set the state of all video players to false
        for (const player of this.players) {
            try {
                player.setMute(this.controllerMuted);
            } catch (e) { }
        };
        // change the global muted state
        this.controllerMuted = !this.controllerMuted;
        // mute the MainAudio
        this.mainAudio.setMute(true);
    }

    /**
     * change between playing/pause state for all videos
     */
    tooglePlay() {
        // set state of the players to the controllerPlaying state
        if (!this.controllerPlaying) {
            try {
                this.mainAudio.play();
            } catch (e) { }
        } else {
            try {
                this.mainAudio.pause();
            } catch (e) { }
        }
        for (const player of this.players) {
            if (!this.controllerPlaying) {
                try {
                    player.play();
                } catch (e) { }
            } else {
                try {
                    player.pause();
                } catch (e) { }
            }
        };
        // change global playing status
        this.controllerPlaying = !this.controllerPlaying;
    }
};

// UTILS functions go here
//  in the future this functions should live in a different file

/**
 * build an url with an inital and end time
 * @param {string} url 
 * @param {number} startTime 
 * @param {number} finishTime 
 * @returns {string} the builded url
 */
// TODO: case when finish time is undefineed
//      error handling
function buildMediaQueryUrlSource(url, startTime, finishTime) {
    return url + `#t=${startTime},${finishTime}`
}


// TODO: seconds to 00:00:00 format. look for time js libss
// function name(params) {
    
// }

// console.log('videoController loaded')
// export class VideoController{}


function log_length(arr) {
    console.log(arr.length)
    
}
// Get the modal
let modal = document.getElementById('modalSelector');

// Get the button that opens the modal
// let btn = document.getElementById("openModalButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("closeModalButton")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// TODOL: Here we load the players and the elements
// import VideoController from '../custom_player.js';
// const globby = require('globby')
/*
DATABASE MOCKUP
urls for the videos in the  set
start and finish time
*/

let url1 = "videos/bunny_manifest.mpd";
let url2 = "videos/bunny_manifest.mpd";
let url3 = "videos/bunny_manifest.mpd";
let url4 = "videos/bunny_manifest.mpd";
let audio_url = 'videos/mainAudio.mpd';
let start_time = 0;
let finish_time = 10000;
// TODO:
/**
 * category tagging 
 * description
 * video set name name
 * 
 */
let fake_duration = finish_time - start_time
// add media fragments #t=[start_time][,end_time]
// this way we only need to worry about stop the video when the finish time is reached
url1 = url1 + `#t=${start_time},${finish_time}`
url2 = url2 + `#t=${start_time},${finish_time}`
url3 = url3 + `#t=${start_time},${finish_time}`
url4 = url4 + `#t=${start_time},${finish_time}`
audio_url = audio_url + `#t=${start_time},${finish_time}`

const controler = new VideoController();
const layout = new Layouter();

console.log(controler.players)

// call load videos when document == ready
ready().
then(initialLoad).
then(getDuration).
then(addVideos).
then(getInitialTime);
// create the ready promise
function ready() {
    return new Promise(function (resolve) {
        if (document.readyState === "complete") {
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", resolve);
        }
    });
}
function initialLoad() {
    // console.log(controler)
    // console.log(url1)
    // console.log(document.querySelector(`#video1`))
    controler.init();
    controler.addMainAudio(audio_url)
    // console.log(controler.players)
    console.log('1 - initial load')
}

function getDuration() {
    controler.duration()
    console.log('2 - get duration')
}

function addVideos() {
    controler.add(0, url1)
    controler.add(1, url2)
    controler.add(2, url3)
    controler.add(3, url4)
    // refresh the layout
    refreshLayout(layout, controler)
    layout.muteButton(controler.controllerMuted);
    layout.playButton(controler.controllerPlaying);
    console.log('3 - added videos')
}

function getInitialTime() {
    // controler.seek(start_time)
    console.log('4 - initial time')
}






function watchers() {
    // TODO: format seconds function
    // document.getElementById('timeSpan').innerText = 
    //     `${controler.getTime() - start_time}/${fake_duration}`;
    document.getElementById('timeSpan').innerText = "00:00:00/00:00:00"
    controler.globalTime = controler.getTime();
    refreshTimeBar();
}

document.getElementById('playButton').addEventListener('click', function (e) {
    controler.tooglePlay();
    layout.playButton(controler.controllerPlaying);
    e.stopImmediatePropagation();

}, false)

document.getElementById('muteButton').addEventListener('click', function (e) {
    controler.toogleGlobalMute();
    layout.muteButton(controler.controllerMuted);
    e.stopImmediatePropagation();
}, false) 

document.getElementById('muteMainAudioButton').addEventListener('click', function (e) {
    controler.onlyMainAudio();
    e.stopImmediatePropagation();
}, false) 

// remove event binders
document.getElementById('remove1').addEventListener('click', function (e) {
    controler.remove(0);
    refreshLayout(layout, controler)
}, false)
document.getElementById('remove2').addEventListener('click', function (e) {
    controler.remove(1);
    refreshLayout(layout, controler)
}, false)
document.getElementById('remove3').addEventListener('click', function (e) {
    controler.remove(2);
    refreshLayout(layout, controler)
}, false)
document.getElementById('remove4').addEventListener('click', function (e) {
    controler.remove(3);
    refreshLayout(layout, controler)
}, false)
// fullscreen event binders
document.getElementById('fullscreen1').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video0'))
}, false)
document.getElementById('fullscreen2').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video1'))
}, false)

document.getElementById('fullscreen3').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video2'))
}, false)

document.getElementById('fullscreen4').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video3'))
}, false)
document.getElementById('fullscreen').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('grid'))
}, false)

document.getElementById('forward10Button').addEventListener('click', function (e) {
    controler.seekForward(10)
}, false)


document.getElementById('replay10Button').addEventListener('click', function (e) {
    controler.seekBackward(10);
}, false)

document.getElementById('audio1').addEventListener('click', function (e) {
    let stat = controler.toogleIndividualMuteAudio(1)
    let ic = document.getElementById('audio1')
    if (stat == false) {
        ic.innerText = 'mic'
    } else {
        ic.innerText = 'mic_off'
    }
}, false)
document.getElementById('audio2').addEventListener('click', function (e) {
    let stat = controler.toogleIndividualMuteAudio(2)
    let ic = document.getElementById('audio2')
    if (stat == false) {
        ic.innerText = 'mic'
    } else {
        ic.innerText = 'mic_off'
    }
}, false)

document.getElementById('audio3').addEventListener('click', function (e) {
    let stat = controler.toogleIndividualMuteAudio(3)
    let ic = document.getElementById('audio3')
    if (stat == false) {
        ic.innerText = 'mic'
    } else {
        ic.innerText = 'mic_off'
    }
}, false)

document.getElementById('audio4').addEventListener('click', function (e) {
    let stat = controler.toogleIndividualMuteAudio(4)
    let ic = document.getElementById('audio4')
    if (stat == false) {
        ic.innerText = 'mic'
    } else {
        ic.innerText = 'mic_off'
    }
}, false)


window.setInterval(function() {
        watchers();}
    ,1000);


// TODO: Fullscreen
function request_fullscreen(DOMobject) {
    // if already full screen; exit
    // else go fullscreen
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {

        if (DOMobject.requestFullscreen) {
            DOMobject.requestFullscreen();
        } else if (DOMobject.mozRequestFullScreen) {
            DOMobject.mozRequestFullScreen();
        } else if (DOMobject.webkitRequestFullscreen) {
            DOMobject.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (DOMobject.msRequestFullscreen) {
            DOMobject.msRequestFullscreen();
        }
    }
}

/**
 * 
 * @param {*} x 
 * @param {*} ele_x 
 * @param {*} ele_width 
 */
let getWidthAdvancePercentage = (x, ele_x, ele_width) => { return (x - ele_x) / ele_width };
/**
 * 
 */
document.getElementById('prog').addEventListener('click', function(e) {
    // get html elements
    let bar_element = document.getElementById('prog');
    let bar_filler = document.getElementById('prog2');
    // get dimensions
    let x = e.pageX
    let ele_x = bar_element.getBoundingClientRect()['left'];
    let ele_width = bar_element.getBoundingClientRect()['width'];
    let percentage =(x-ele_x)/ele_width;
    // set the style of the bar filler element
    bar_filler.style = `width:${percentage*100}%`
    // get the time adjusted with the percentage
    let time = controler.players[0].duration()*percentage;
    // actualize the controler parmeters and seek the time in player
    controler.globalTime = time;
    controler.seek(time);
    // get only one click at a time
    e.stopImmediatePropagation();
})


function refreshTimeBar() {
    // get html elements
    let bar_element = document.getElementById('prog');
    let bar_filler = document.getElementById('prog2');
    let ele_x = bar_element.getBoundingClientRect()['left'];
    let ele_width = bar_element.getBoundingClientRect()['width'];
    let time = controler.getTime();
    let duration = controler.duration();

    let percentage = time / (duration) 

    bar_filler.style = `width:${percentage * 100}%`
}


function refreshLayout(layout,controler) {
    layout.setLayout(controler.getPlayerStatus())
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case '0':
            controler.add(0, url)
            refreshLayout(layout, controler)
            break;
        case '1':
            controler.add(1, url)
            refreshLayout(layout, controler)
            break;
        case '2':
            controler.add(2, url)
            refreshLayout(layout, controler)
            break;
        case '3':
            controler.add(3, url)
            refreshLayout(layout, controler)
            break;
        case 's':
            modal.style.display = "block";
        case 'm':
            controler.toogleGlobalMute();
            layout.muteButton(controler.controllerMuted);
            break;
        case "ArrowLeft":
            // Do something for "left arrow" key press.

            controler.seekBackward(10);
            break;
        case "ArrowRight":
            // Do something for "right arrow" key press.
            controler.seekForward(10)
            break;
        case " ":
            // Do something for "espace" key press.
            controler.tooglePlay();
            layout.playButton(controler.controllerPlaying);
            break;
        default:
            console.log(event.key)
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);