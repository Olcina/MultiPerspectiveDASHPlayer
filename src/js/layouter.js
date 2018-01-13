
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
        console.log(this.player2);
        console.log(this.player3);
        console.log(this.player4);
    }
    
    setOneVideoLayout() {
        console.log(this);
        document.getElementById('video1-container').className = 'onevideo'
        this.player2.className = 'hide'
        this.player3.className = 'hide'
        this.player4.className = 'hide'
    }
    setTwoVideoLayout() {
        this.player1.className = 'twoVideos1'
        this.player2.className = 'twoVideos2'
        this.player3.className = 'hide'
        this.player4.className = 'hide'
    }
    setTreeVideoLayout() {
        this.player1.className = 'treevideos1'
        this.player2.className = 'treevideos2'
        this.player3.className = 'treevideos3'
        this.player4.className = 'hide'
    }
    setFourVideoLayout() {
        this.player1.className = ' '
        this.player2.className = ' '
        this.player3.className = ' '
        this.player4.className = ' '
    }


}
