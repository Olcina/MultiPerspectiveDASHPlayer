
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