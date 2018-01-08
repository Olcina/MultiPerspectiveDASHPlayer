
const express = require('express')
const app = express()
const path = require('path')
// const videoController = require('custom_player.js')

const __src = '/src'

app.get('/', (req, res) => res.sendFile(path.join(__dirname + __src  +'/index.html')))

app.use(express.static(__dirname + __src +'/css'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + __src + '/js'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/videos'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))
