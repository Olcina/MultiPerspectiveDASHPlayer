/* TODO: 

js class to controll the video players
Add all the hmtl dinamically with js so it can be 
the teacher audio should controll the global state of the video player
    - duration
    - autoplay
    
when a video is added we should call seek for the video when is ready
using a promise call

*/

/**
 * @class VideoController
 * @description The video controller allows you to control up to 4 videos and 1 main audio
 */
class VideoController {
    /**
     * Create a VideoController
     * @param {string} root_name 
     * @param {number} globalTime 
     * @param {boolean} controllerMuted 
     * @param {number} startTime 
     * @param {number} endTime 
     * @param {boolean} controlerPlaying 
     */
    constructor(root_name = 'root',
        globalTime = 0,
        controllerMuted = true,
        startTime = 0,
        endTime = null,
        controlerPlaying = false) {
        this.players = [];
        this.teacher_audio = null;
        this.root_name = root_name;
        this.globalTime = globalTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.canPlayCount = 0;
        // this.init();
        this.controllerMuted = controllerMuted;
        this.isReady = false;
    }
    /**
     * create the MediaPlayers
     */
    init() {
        // create and append the video elements on the root element
        // teache audio
        this.teacher_audio = dashjs.MediaPlayer().create();
        this.teacher_audio.on('canPlay',function () {
            this.isReady = true
        }.bind(this));
        this.canPlayCount += 1;
        //  - 4 video tags
        const n = 4;
        for (let i = 0; i < n; i++) {
            this.players.push(dashjs.MediaPlayer().create())
        };
    }

    /**
     * Calculate the duration of the video in function of the initial values
     * @returns {number} the duration of the VideoController
     */
    duration() {
        if (this.endTime == null) {
            return this.teacher_audio.duration() - this.startTime
        } else {
            return this.endTime - this.startTime
        }
    }

    /**
     * Remove the media source from a video
     * 
     * @param {number} slot the slot number to be removed
     */
    remove(slot) {
        this.players[slot].attachSource('');
        console.log(`slot${slot} reseted`)
    }

    /**
     * set the media source to the selected slot
     * 
     * @param {number} slot the slot number 
     * @param {string} url the media source url 
     */
    setSource(slot, url) {
        this.players[slot].attachSource(url);
    }

    /**
     * get the html audio element for the teacher,
     * initialize and loads the media source from the url.
     * 
     * @param {string} url to the media source
     */
    addTeacherAudio(url) {
        
        let html_vid_element = document.querySelector(`#teacherAudio`)
        console.log(html_vid_element)
        this.teacher_audio.initialize(html_vid_element,url,false);
    }
    /**
     * get the html video element for the selected slot,
     * initialize and load the media source from the url.
     * @param {number} slot 
     * @param {string} url 
     */
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
     * Pause all the active players
     */
    pause() {
        this.teacher_audio.pause();

        for (const player of this.players) {
            try {
                player.pause();
            } catch (e) { }
        };
    }

    /**
     * change between playing/pause state for all videos
     */
    tooglePlay() {
        // set state of the players to the controlerPlaying state
        if (!this.controlerPlaying) {
            try {
                this.teacher_audio.play();
            } catch (e) { }
        } else {

            try {
                this.teacher_audio.pause();
            } catch (e) { }
        }
        for (const player of this.players) {
            if (!this.controlerPlaying) {
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
        this.controlerPlaying = !this.controlerPlaying;
    }

    /**
     * seek the value for all the active players
     * @param {number} value 
     */
    seek(value) {
        this.teacher_audio.seek(value);
        for (const player of this.players) {
            try {
                player.seek(value);
            } catch (e) { }
        };
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
        // mute the teacher
        this.teacher_audio.setMute(true);
    }

    /**
     * Unmute the main audio and mute every other player
     */
    onlyTeacherSound() {
        this.controllerMuted = true;
        for (const player of this.players) {
            try {
                player.setMute(this.controllerMuted);
            } catch (e) { }
        };
        this.teacher_audio.setMute(false);
    }

    /**
     * seek forward 10 seconds for all players
     */
    forward10() {
        this.globalTime += 10;
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
        this.teacher_audio.seek(this.globalTime);
    }

    /**
     * seek backwards 10 seconds for all players
     */
    backward10() {
        if (this.globalTime <= 10) {
            this.globalTime = 0;
        } else {
            this.globalTime -= 10;
            console.log('called on init')
        }
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
        this.teacher_audio.seek(this.globalTime);
    }
    /**
     * get the advance percentaje based in the predefined duration of the videos.
     */
    getVideoAdvancePercentage() {
        return advance
    }
};


console.log('videoController loaded')
// export default class VideoController{}