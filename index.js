const express = require('express')
const app = express()
const path = require('path')
const videoController = require('custom_player.js')


app.get('/', (req, res) => res.sendFile(path.join(__dirname +'/index.html')))

app.use(express.static(__dirname + '/css'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/videos'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))