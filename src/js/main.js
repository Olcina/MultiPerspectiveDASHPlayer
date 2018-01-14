// TODOL: Here we load the players and the elements
// import VideoController from '../custom_player.js';
// const globby = require('globby')
/*
DATABASE MOCKUP
urls for the videos in the  set
start and finish time

*/
let url1 = "bunny_manifest.mpd";
let url2 = "bunny_manifest.mpd";
let url3 = "bunny_manifest.mpd";
let url4 = "bunny_manifest.mpd";
let audio_url = 'mainAudio.mpd';
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

const controler = new VideoController(startTime = start_time, endTime = finish_time);
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
    refreshLayout(layout, controler)
    console.log('3 - added videos')
}

function getInitialTime() {
    // controler.seek(start_time)
    console.log('4 - initial time')
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
            console.log(controler.getPlayerStatus());
            
        case 'm':
            controler.toogleGlobalMute();
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
            break;
        default:
            console.log(event.key)
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);



function watchers() {
    document.getElementById('timeSpan').innerText = 
        `${controler.getTime() - start_time}/${fake_duration}`;
    controler.globalTime = controler.getTime();
    console.log('working')
}

document.getElementById('playButton').addEventListener('click', function (e) {
    controler.tooglePlay();
    e.stopImmediatePropagation();

}, false)

document.getElementById('muteButton').addEventListener('click', function (e) {
    controler.toogleGlobalMute();
    e.stopImmediatePropagation();
}, false) 

document.getElementById('muteMainAudioButton').addEventListener('click', function (e) {
    controler.onlyMainAudio();
    e.stopImmediatePropagation();
}, false) 

// add videos manually binders

document.getElementById('add1').addEventListener('click', function (e) {
    controler.setSource(0,url1);  
    refreshLayout(layout, controler) 
},false)
document.getElementById('add2').addEventListener('click', function (e) {
    controler.setSource(1, url2);
    refreshLayout(layout, controler)
}, false)
document.getElementById('add3').addEventListener('click', function (e) {
    controler.setSource(2, url3);
    refreshLayout(layout, controler)
}, false)
document.getElementById('add4').addEventListener('click', function (e) {
    controler.setSource(3, url4);
    refreshLayout(layout, controler)
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


function refreshLayout(layout,controler) {
    layout.setLayout(controler.getPlayerStatus())
}

