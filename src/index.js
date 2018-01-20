const express = require('express')
const app = express()
const path = require('path')
// const videoController = require('./js/custom_player.js')
const template = require('./templates/index')
const videoloader = require('./templates/videoPlayer/videoLoader')


// Create a false lesson object for test and populate with false perspectives
let lesson = {
    title: 'Demo lesson',
    perspectives: [],
}
let indent = 1
for (let index = 1; index < 20; index++) {
    
    let perspective = {
        name: `pers ${index}`,
        manifestURL: `videos/bunny_manifest.mpd`,
        imgURL: `images/dummy${indent}.png`,
        description: `this is a perspective`,

    }
    indent += 1
    if (indent > 4) {
        indent = 1
    }
    lesson.perspectives.push(perspective)
    
}

const __src = ''

var context = { videoLoader: videoloader(lesson) };


app.get('/', (req, res) => res.send(template(context)))
app.get('/skeleton', (req, res) => res.send(template()))
app.get('/404', (req, res) => res.sendFile(path.join(__dirname + __src + '/404.html')))
app.use(express.static(__dirname + __src +'/css'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + __src + '/js'));
app.use(express.static(__dirname + __src + '/sw'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname  + '/../media'));

// app.use(express.static(__dirname + '/images'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))