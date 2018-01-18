const express = require('express')
const app = express()
const path = require('path')
// const videoController = require('./js/custom_player.js')
const template = require('./templates/index')

var context = { videoSet: "My video Seet" };

const __src = ''

app.get('/', (req, res) => res.send(template(context)))
// app.get('/', (req, res) => res.sendFile(path.join(__dirname + __src  +'/index.html')))
app.get('/404', (req, res) => res.sendFile(path.join(__dirname + __src + '/404.html')))
app.use(express.static(__dirname + __src +'/css'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + __src + '/js'));
app.use(express.static(__dirname + __src + '/sw'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname  + '/../media'));

// app.use(express.static(__dirname + '/images'));
app.listen(3000, () => console.log('Example app listening on port 3000!'))