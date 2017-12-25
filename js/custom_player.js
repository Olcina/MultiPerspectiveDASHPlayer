// TODO: js class to controll the video players


class VideoController {
    constructor(root_name = 'root',
        globalTime = 0,
        controlerMuted = true,
        controlerPlaying = false) {
        this.players = [];
        // this.player = dashjs.MediaPlayer().create()
        this.root_name = root_name;
        this.globalTime = globalTime;
        // this.init();
        this.controlerMuted = controlerMuted;
    }

    init() {
        // create and append the video elements on the root element
        //  - 4 video tags
        const n = 4;
        for (let i = 0; i < n; i++) {
            //     let base_element = document.createElement(`video`);
            //     base_element.setAttribute('id', `video${i}`);
            //     base_element.setAttribute('controls', '');
            //     document.getElementById(this.root_name).appendChild(base_element);

            this.players.push(dashjs.MediaPlayer().create())
        }
        // // bar wrapper
        // let barWrapper = document.createElement('div')
        // barWrapper.setAttribute('id', 'barWrapper')
        // let bar = document.getElementById(this.root_name).appendChild(barWrapper)

        // // play button
        // let play_button  = document.createElement('div')
        // play_button.setAttribute('id', 'playButton')
        // let playbtn = document.getElementById('barWrapper').appendChild(play_button);
        // playbtn.className = 'btn';
        // playbtn.innerText = 'Play';

        // let time_span = document.createElement('div')
        // time_span.setAttribute('id', 'timeSpan')
        // let timeSpan = document.getElementById('barWrapper').appendChild(time_span);
        // timeSpan.className = 'btn'
        // timeSpan.innerText = '0';
        // //  pause button 

        // let mute_button = document.createElement('div')
        // mute_button.setAttribute('id', 'muteButton')
        // let mutebtn = document.getElementById('barWrapper').appendChild(mute_button);
        // mutebtn.className = 'btn';
        // mutebtn.innerText = 'Mute';
        // let html_to_root = `<video id='video1'></video>
        //                     <video id='video2'></video>
        //                     <video id='video3'></video>
        //                     <video id='video4'></video>
        //                     <div id='playButton' class='btn'></div>`

        // document.getElementById(this.root_name).innerHTML= html_to_root;
    }


    add(slot, url) {
        let html_vid_element = document.querySelector(`#video${slot}`)
        this.players[slot].initialize(html_vid_element, url, false)
        return new Promise((resolve, reject) => {
            if (this.players[slot].isReady()) {
                resolve(console.log(`ready vid${slot}`));
            }
        })
    }
    pause() {
        for (const player of this.players) {
            try {
                player.pause();
            } catch (e) { }
        };
    }
    tooglePlay() {
        // set state of the players to the controlerPlaying state
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
    seek(value) {

        for (const player of this.players) {
            try {
                player.seek(value);
            } catch (e) { }
        };
    }
    toogleGlobalMute() {
        // set the state of all video players to false
        for (const player of this.players) {
            try {
                player.setMute(this.controlerMuted);
            } catch (e) { }
        };
        // change the global muted state
        this.controlerMuted = !this.controlerMuted;
    }
    forward10() {
        this.globalTime += 10;
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
    }
    backward10() {
        if (this.globalTime <= 10) {
            this.globalTime = 0;
        } else {
            this.globalTime -= 10;
        }
        for (const player of this.players) {
            try {
                player.seek(this.globalTime);
            } catch (e) { }
        };
    }
    getVideoAdvancePercentage() {

    }
};


export default class VideoController{}