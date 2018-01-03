// TODOL: Here we load the players and the elements
// import VideoController from '../custom_player.js';

const controler = new VideoController();
let url = "manifest.mpd";

console.log(controler.players)

// call load videos when document == ready
ready().then(loadVideos);
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

function loadVideos() {
    console.log(controler)
    console.log(url)
    console.log(document.querySelector(`#video1`))
    controler.init();
    controler.add(0, url)
    controler.add(1, url)
    controler.add(2, url)
    controler.add(3, url)
    console.log(controler.players)
}


window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case '0':
            controler.add(0, url)
            break;
        case '1':
            controler.add(1, url)
            break;
        case '2':
            controler.add(2, url)
            break;
        case '3':
            controler.add(3, url)
            break;
        case 'm':
            controler.toogleGlobalMute();
            break;
        case "ArrowLeft":
            // Do something for "left arrow" key press.

            controler.backward10();
            break;
        case "ArrowRight":
            // Do something for "right arrow" key press.
            controler.forward10()
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
    document.getElementById('timeSpan').innerText = `${controler.players[0].time()}/${controler.players[0].duration()}`
    controler.globalTime = controler.players[0].time();
    document.getElementById('playButton').addEventListener('click', function(e){
        console.log('played')
        controler.tooglePlay();
        e.stopImmediatePropagation();
        
    }, false) 
    document.getElementById('muteButton').addEventListener('click', function (e) {
        console.log('played')
        controler.toogleGlobalMute();
        e.stopImmediatePropagation();

    }, false) 
}


// add videos manually
document.getElementById('add1').addEventListener('click', function (e) {
    controler.add(0,url);   
},false)
document.getElementById('add2').addEventListener('click', function (e) {
    controler.add(1, url);
}, false)
document.getElementById('add3').addEventListener('click', function (e) {
    controler.add(2, url);
}, false)
document.getElementById('add4').addEventListener('click', function (e) {
    controler.add(3, url);
}, false)

window.setInterval(function() {
        watchers();}
    ,1000);


let getWidthAdvancePercentage = (x, ele_x, ele_width) => { return (x - ele_x) / ele_width };

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

