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
// create the ready promise
$(document).ready(function () {
    console.log('document Ready')
    ready().
    then(initialLoad).
    then(getDuration).
    then(addVideos).
    then(getInitialTime);
    
})

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
    // controler.add(3, url4)
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

// Half second interval for auto-synchronizaition
window.setInterval(function() {
 if(!controler.ifSynchronize()) {
     controler.synchronize();
     refreshLayout(layout, controler)
    };
},500)

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

// Perspective loader --> needs to be adopted in a proper controller
const perspectives = document.getElementsByClassName('perspective')

for (const pers of perspectives) {
    pers.addEventListener('click', function (e) {
        let vid_url = this.getElementsByTagName('output')[0].innerText
        modal.style.display = "none";    
        controler.add(3, vid_url).then(function(param) {
            refreshLayout(layout, controler)
        }).catch(controler.setSource(controler.getFirstFreeSlot(), vid_url))
        // modal.style.display = "none";
        // refresh the layout
        // console.log('syncro')
        e.stopImmediatePropagation();
        
    })
    
}

console.log(perspectives)