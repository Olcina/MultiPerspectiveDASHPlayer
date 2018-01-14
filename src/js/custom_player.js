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
        controllerMuted = true,
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