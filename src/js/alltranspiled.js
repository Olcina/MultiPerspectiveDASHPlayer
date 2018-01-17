'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Layouter
 * @description Add and remove the html classes in function of the active players
 *              
 */

var Layouter = function () {
    function Layouter() {
        _classCallCheck(this, Layouter);

        this.player1 = null;
        this.player2 = null;
        this.player3 = null;
        this.player4 = null;
        this.init();
    }

    _createClass(Layouter, [{
        key: 'init',
        value: function init() {
            this.player1 = document.getElementById('video1-container');
            this.player2 = document.getElementById('video2-container');
            this.player3 = document.getElementById('video3-container');
            this.player4 = document.getElementById('video4-container');
            this.players = [this.player1, this.player2, this.player3, this.player4];
            console.log(this.players);
        }
    }, {
        key: 'setLayout',
        value: function setLayout(playerStatus) {
            var indexToShow = new Array();
            var indexToHide = new Array();
            var counter = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = playerStatus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pl = _step.value;

                    if (pl == true) {
                        indexToShow.push(counter);
                    } else {
                        indexToHide.push(counter);
                    }
                    counter += 1;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            switch (indexToShow.length) {
                case 1:
                    this.setOneVideoLayout(indexToShow, indexToHide);
                    break;
                case 2:
                    this.setTwoVideoLayout(indexToShow, indexToHide);
                    break;
                case 3:
                    this.setTreeVideoLayout(indexToShow, indexToHide);
                    break;
                case 4:
                    this.setFourVideoLayout(indexToShow, indexToHide);
                    break;
                default:
                    console.log('error');
                    return;
            }
        }
    }, {
        key: 'setOneVideoLayout',
        value: function setOneVideoLayout(indexToShow, indexToHide) {
            this.players[indexToShow[0]].className = 'onevideo';
            this.players[indexToHide[0]].className = 'hide';
            this.players[indexToHide[1]].className = 'hide';
            this.players[indexToHide[2]].className = 'hide';
        }
    }, {
        key: 'setTwoVideoLayout',
        value: function setTwoVideoLayout(indexToShow, indexToHide) {
            this.players[indexToShow[0]].className = 'twovideos1';
            this.players[indexToShow[1]].className = 'twovideos2';
            this.players[indexToHide[0]].className = 'hide';
            this.players[indexToHide[1]].className = 'hide';
        }
    }, {
        key: 'setTreeVideoLayout',
        value: function setTreeVideoLayout(indexToShow, indexToHide) {
            this.players[indexToShow[0]].className = 'treevideos1';
            this.players[indexToShow[1]].className = 'treevideos2';
            this.players[indexToShow[2]].className = 'treevideos3';
            this.players[indexToHide[0]].className = 'hide';
        }
    }, {
        key: 'setFourVideoLayout',
        value: function setFourVideoLayout(indexToShow, indexToHide) {
            this.players[indexToShow[0]].className = ' ';
            this.players[indexToShow[1]].className = ' ';
            this.players[indexToShow[2]].className = ' ';
            this.players[indexToShow[3]].className = ' ';
        }
    }, {
        key: 'playButton',
        value: function playButton(playing) {
            if (playing == true) {
                document.getElementById('playButton').innerText = 'pause_circle_filled';
            } else {
                document.getElementById('playButton').innerText = 'play_circle_filled';
            }
        }
    }, {
        key: 'muteButton',
        value: function muteButton(muted) {
            if (muted == true) {
                document.getElementById('muteButton').innerText = 'mic_off';
            } else {
                document.getElementById('muteButton').innerText = 'mic';
            }
        }
    }]);

    return Layouter;
}();

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


var VideoController = function () {
    /**
     * Create a VideoController
     * @param {string} root_name 
     * @param {number} globalTime 
     * @param {boolean} controllerMuted 
     * @param {number} startTime 
     * @param {number} endTime 
     * @param {boolean} controllerPlaying 
     */
    function VideoController() {
        var root_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'root';
        var controllerMuted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var controllerPlaying = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var endTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var globalTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var startTime = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

        _classCallCheck(this, VideoController);

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
        this.playerStatus = [false, false, false, false];
        // this.init();
    }
    /**
     * ---------------- INIT ----------------
     * create the MediaPlayers
     */


    _createClass(VideoController, [{
        key: 'init',
        value: function init() {
            // create and append the video elements on the root element
            // Main Audio
            this.mainAudio = dashjs.MediaPlayer().create();
            this.mainAudio.on('canPlay', function () {
                this.isReady = true;
            }.bind(this));
            this.canPlayCount += 1;
            //  - 4 video tags
            var n = 4;
            for (var i = 0; i < n; i++) {
                this.players.push(dashjs.MediaPlayer().create());
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

    }, {
        key: 'add',
        value: function add(slot, url) {
            var _this = this;

            var html_vid_element = document.querySelector('#video' + slot);
            this.players[slot].initialize(html_vid_element, url, false);
            return new Promise(function (resolve, reject) {
                if (_this.players[slot].isReady()) {
                    resolve(console.log('ready vid' + slot));
                }
            });
        }

        /**
         * get the html audio element for the MainAudio,
         * initialize and loads the media source from the url.
         * 
         * @param {string} url to the media source
         */
        // TODO : raise error when video element with id='mainAudio' doesn't exist 

    }, {
        key: 'addMainAudio',
        value: function addMainAudio(url) {

            var html_vid_element = document.querySelector('#mainAudio');
            console.log(html_vid_element);
            this.mainAudio.initialize(html_vid_element, url, false);
        }

        /**
         * Calculate the duration of the video in function of the initial values
         * @returns {number} the duration of the VideoController
         */

    }, {
        key: 'duration',
        value: function duration() {
            if (this.endTime == null) {
                return this.mainAudio.duration() - this.startTime;
            } else {
                return this.endTime - this.startTime;
            }
        }

        /**
         * get the reference time for all the players
         * 
         * @returns {number} the reference time 
         */

    }, {
        key: 'getTime',
        value: function getTime() {
            return this.mainAudio.time();
        }

        /**
         * get the advance percentaje based in the predefined duration of the videos.
         */

    }, {
        key: 'getVideoAdvancePercentage',
        value: function getVideoAdvancePercentage() {

            return advance;
        }

        /**
         * Unmute the main audio and mute every other player
         */

    }, {
        key: 'onlyMainAudio',
        value: function onlyMainAudio() {
            this.controllerMuted = true;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var player = _step2.value;

                    try {
                        player.setMute(this.controllerMuted);
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            ;
            this.mainAudio.setMute(false);
        }

        /**
         * Pause all the active players
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.mainAudio.pause();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var player = _step3.value;

                    try {
                        player.pause();
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            ;
        }

        /**
         * Analize the status of the players, returns an boolean array wiht the status of the videos
         */

    }, {
        key: 'getPlayerStatus',
        value: function getPlayerStatus() {
            var i = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.players[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var player = _step4.value;

                    console.log(this.playerStatus);
                    this.playerStatus[i] = player.isReady();
                    i += 1;
                    console.log(this.playerStatus, i);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return this.playerStatus;
        }
        /**
         * Remove the media source from a video
         * 
         * @param {number} slot the slot number to be removed
         */

    }, {
        key: 'remove',
        value: function remove(slot) {
            var ele = this.players[slot];
            ele.attachSource('');
        }

        /**
         * seek the value for all the active players
         * @param {number} value 
         */

    }, {
        key: 'seek',
        value: function seek(value) {
            this.mainAudio.seek(value);
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.players[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var player = _step5.value;

                    try {
                        player.seek(value);
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            ;
        }

        /**
         * seek backwards x seconds for all players
         * @param {number} x
         */

    }, {
        key: 'seekBackward',
        value: function seekBackward(x) {
            if (this.globalTime <= x) {
                this.globalTime = 0;
            } else {
                this.globalTime -= x;
            }
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.players[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var player = _step6.value;

                    try {
                        player.seek(this.globalTime);
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            ;
            this.mainAudio.seek(this.globalTime);
        }

        /**
         * seek forward x seconds for all players
         * @param {number} x 
         */

    }, {
        key: 'seekForward',
        value: function seekForward(x) {
            this.globalTime += x;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.players[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var player = _step7.value;

                    try {
                        player.seek(this.globalTime);
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            ;
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

    }, {
        key: 'setSource',
        value: function setSource(slot, url) {
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

    }, {
        key: 'toogleIndividualMuteAudio',
        value: function toogleIndividualMuteAudio(slot) {
            var selectedPlayer = this.players[slot - 1];
            if (selectedPlayer.isMuted()) {
                selectedPlayer.setMute(false);
                return false;
            } else {
                selectedPlayer.setMute(true);
                return true;
            }
        }

        /**
         * Changes the global state of muted for all active players
         */

    }, {
        key: 'toogleGlobalMute',
        value: function toogleGlobalMute() {
            // set the state of all video players to false
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.players[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var player = _step8.value;

                    try {
                        player.setMute(this.controllerMuted);
                    } catch (e) {}
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }

            ;
            // change the global muted state
            this.controllerMuted = !this.controllerMuted;
            // mute the MainAudio
            this.mainAudio.setMute(true);
        }

        /**
         * change between playing/pause state for all videos
         */

    }, {
        key: 'tooglePlay',
        value: function tooglePlay() {
            // set state of the players to the controllerPlaying state
            if (!this.controllerPlaying) {
                try {
                    this.mainAudio.play();
                } catch (e) {}
            } else {
                try {
                    this.mainAudio.pause();
                } catch (e) {}
            }
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                for (var _iterator9 = this.players[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    var player = _step9.value;

                    if (!this.controllerPlaying) {
                        try {
                            player.play();
                        } catch (e) {}
                    } else {
                        try {
                            player.pause();
                        } catch (e) {}
                    }
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            ;
            // change global playing status
            this.controllerPlaying = !this.controllerPlaying;
        }
    }]);

    return VideoController;
}();

;

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
    return url + ('#t=' + startTime + ',' + finishTime);
}

// TODO: seconds to 00:00:00 format. look for time js libss
// function name(params) {

// }

// console.log('videoController loaded')
// export class VideoController{}


function log_length(arr) {
    console.log(arr.length);
}
// Get the modal
var modal = document.getElementById('modalSelector');

// Get the button that opens the modal
// let btn = document.getElementById("openModalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModalButton")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// TODOL: Here we load the players and the elements
// import VideoController from '../custom_player.js';
// const globby = require('globby')
/*
DATABASE MOCKUP
urls for the videos in the  set
start and finish time
*/

var url1 = "videos/bunny_manifest.mpd";
var url2 = "videos/bunny_manifest.mpd";
var url3 = "videos/bunny_manifest.mpd";
var url4 = "videos/bunny_manifest.mpd";
var audio_url = 'videos/mainAudio.mpd';
var start_time = 0;
var finish_time = 10000;
// TODO:
/**
 * category tagging 
 * description
 * video set name name
 * 
 */
var fake_duration = finish_time - start_time;
// add media fragments #t=[start_time][,end_time]
// this way we only need to worry about stop the video when the finish time is reached
url1 = url1 + ('#t=' + start_time + ',' + finish_time);
url2 = url2 + ('#t=' + start_time + ',' + finish_time);
url3 = url3 + ('#t=' + start_time + ',' + finish_time);
url4 = url4 + ('#t=' + start_time + ',' + finish_time);
audio_url = audio_url + ('#t=' + start_time + ',' + finish_time);

var controler = new VideoController();
var layout = new Layouter();

console.log(controler.players);

// call load videos when document == ready
ready().then(initialLoad).then(getDuration).then(addVideos).then(getInitialTime);
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
    controler.addMainAudio(audio_url);
    // console.log(controler.players)
    console.log('1 - initial load');
}

function getDuration() {
    controler.duration();
    console.log('2 - get duration');
}

function addVideos() {
    controler.add(0, url1);
    controler.add(1, url2);
    controler.add(2, url3);
    controler.add(3, url4);
    // refresh the layout
    refreshLayout(layout, controler);
    layout.muteButton(controler.controllerMuted);
    layout.playButton(controler.controllerPlaying);
    console.log('3 - added videos');
}

function getInitialTime() {
    // controler.seek(start_time)
    console.log('4 - initial time');
}

function watchers() {
    // TODO: format seconds function
    // document.getElementById('timeSpan').innerText = 
    //     `${controler.getTime() - start_time}/${fake_duration}`;
    document.getElementById('timeSpan').innerText = "00:00:00/00:00:00";
    controler.globalTime = controler.getTime();
    refreshTimeBar();
}

document.getElementById('playButton').addEventListener('click', function (e) {
    controler.tooglePlay();
    layout.playButton(controler.controllerPlaying);
    e.stopImmediatePropagation();
}, false);

document.getElementById('muteButton').addEventListener('click', function (e) {
    controler.toogleGlobalMute();
    layout.muteButton(controler.controllerMuted);
    e.stopImmediatePropagation();
}, false);

document.getElementById('muteMainAudioButton').addEventListener('click', function (e) {
    controler.onlyMainAudio();
    e.stopImmediatePropagation();
}, false);

// remove event binders
document.getElementById('remove1').addEventListener('click', function (e) {
    controler.remove(0);
    refreshLayout(layout, controler);
}, false);
document.getElementById('remove2').addEventListener('click', function (e) {
    controler.remove(1);
    refreshLayout(layout, controler);
}, false);
document.getElementById('remove3').addEventListener('click', function (e) {
    controler.remove(2);
    refreshLayout(layout, controler);
}, false);
document.getElementById('remove4').addEventListener('click', function (e) {
    controler.remove(3);
    refreshLayout(layout, controler);
}, false);
// fullscreen event binders
document.getElementById('fullscreen1').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video0'));
}, false);
document.getElementById('fullscreen2').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video1'));
}, false);

document.getElementById('fullscreen3').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video2'));
}, false);

document.getElementById('fullscreen4').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('video3'));
}, false);
document.getElementById('fullscreen').addEventListener('click', function (e) {
    request_fullscreen(document.getElementById('grid'));
}, false);

document.getElementById('forward10Button').addEventListener('click', function (e) {
    controler.seekForward(10);
}, false);

document.getElementById('replay10Button').addEventListener('click', function (e) {
    controler.seekBackward(10);
}, false);

document.getElementById('audio1').addEventListener('click', function (e) {
    var stat = controler.toogleIndividualMuteAudio(1);
    var ic = document.getElementById('audio1');
    if (stat == false) {
        ic.innerText = 'mic';
    } else {
        ic.innerText = 'mic_off';
    }
}, false);
document.getElementById('audio2').addEventListener('click', function (e) {
    var stat = controler.toogleIndividualMuteAudio(2);
    var ic = document.getElementById('audio2');
    if (stat == false) {
        ic.innerText = 'mic';
    } else {
        ic.innerText = 'mic_off';
    }
}, false);

document.getElementById('audio3').addEventListener('click', function (e) {
    var stat = controler.toogleIndividualMuteAudio(3);
    var ic = document.getElementById('audio3');
    if (stat == false) {
        ic.innerText = 'mic';
    } else {
        ic.innerText = 'mic_off';
    }
}, false);

document.getElementById('audio4').addEventListener('click', function (e) {
    var stat = controler.toogleIndividualMuteAudio(4);
    var ic = document.getElementById('audio4');
    if (stat == false) {
        ic.innerText = 'mic';
    } else {
        ic.innerText = 'mic_off';
    }
}, false);

window.setInterval(function () {
    watchers();
}, 1000);

// TODO: Fullscreen
function request_fullscreen(DOMobject) {
    // if already full screen; exit
    // else go fullscreen
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
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
var getWidthAdvancePercentage = function getWidthAdvancePercentage(x, ele_x, ele_width) {
    return (x - ele_x) / ele_width;
};
/**
 * 
 */
document.getElementById('prog').addEventListener('click', function (e) {
    // get html elements
    var bar_element = document.getElementById('prog');
    var bar_filler = document.getElementById('prog2');
    // get dimensions
    var x = e.pageX;
    var ele_x = bar_element.getBoundingClientRect()['left'];
    var ele_width = bar_element.getBoundingClientRect()['width'];
    var percentage = (x - ele_x) / ele_width;
    // set the style of the bar filler element
    bar_filler.style = 'width:' + percentage * 100 + '%';
    // get the time adjusted with the percentage
    var time = controler.players[0].duration() * percentage;
    // actualize the controler parmeters and seek the time in player
    controler.globalTime = time;
    controler.seek(time);
    // get only one click at a time
    e.stopImmediatePropagation();
});

function refreshTimeBar() {
    // get html elements
    var bar_element = document.getElementById('prog');
    var bar_filler = document.getElementById('prog2');
    var ele_x = bar_element.getBoundingClientRect()['left'];
    var ele_width = bar_element.getBoundingClientRect()['width'];
    var time = controler.getTime();
    var duration = controler.duration();

    var percentage = time / duration;

    bar_filler.style = 'width:' + percentage * 100 + '%';
}

function refreshLayout(layout, controler) {
    layout.setLayout(controler.getPlayerStatus());
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case '0':
            controler.add(0, url);
            refreshLayout(layout, controler);
            break;
        case '1':
            controler.add(1, url);
            refreshLayout(layout, controler);
            break;
        case '2':
            controler.add(2, url);
            refreshLayout(layout, controler);
            break;
        case '3':
            controler.add(3, url);
            refreshLayout(layout, controler);
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
            controler.seekForward(10);
            break;
        case " ":
            // Do something for "espace" key press.
            controler.tooglePlay();
            layout.playButton(controler.controllerPlaying);
            break;
        default:
            console.log(event.key);
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);