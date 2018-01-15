# Development ideas/ features to implement/ things to do

## Service Worker

- add a service worker to fetch js files, css files, images and the future components.
- intercept the request queue from dash player with the SW
- add footer to inform the user about the connection status

## IndexesDB

- add the current buffer to an indexedDB so the player load quicker the second time we visit the same video set

## VideoPlayer

- ensure synchronization between the videos
- add an image to background the video player.
- detect max-size of the browser to set the quality. So we don't load several 1080p videos on mobile phones.
- don't show the videos before the are in a "ready to play" # MULTI VIDEO DASH INTEGRATION -- Loader created (e49ac3b)
- Mute/Unmute icon changes dynamically
- function to mute the videos individually

## Database

- generate a database to store the scenes containing (start and end point, videos, )
- create a library page for choose between different datasets
- improve project folder structure
- create a selector for the add the perspectives - Basic implementation (7b8eeec)

## General

- create a proper CONTRIBUTE.md file

## Development Task

- add some tests for the implemented features
- implement the "custom_player.js" containing the main js class  "VideoController" as an npm module
- generate a grunt file that can "build" the "src" using uglify and babel.
- autogenerate documentation using DOCjs

## Solved

- add images to the overlays - Solved in (9cf874b)
- fullscren for the videos and de video players grid - Solved in (7cd2873)
- fix the video advance bar so the 0% will be the start time and 100% the finish time. Solved in (cba3cc3, 5428de8)
- add some "ready to use" test videos Solved in (f34864c)
- adjust the videos as they are added to the main player. If there is only one video it should fit the hole area. If there's 2 the should fit side by side and so on until fill the 4 maximun perspectives. Solved in (7c67d75)