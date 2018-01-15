# MULTI VIDEO DASH INTEGRATION

This project covers the implementation of an MPEG-DASH player to control several videos and one main audio at the same time, the videos should be always synchronized. It aims to generate an open source video tool to help researchers, trainers or educators analyze scenes with different perspectives at the same time. For example, A tennis trainer that wants to analyze the movements of his students could set 4 cameras at different points and save different snippets to show to the students how they can improve his movements. For this, the tool should be able of saving scenes, add a description and tag them with different categories.

![alt text](coverImage.jpg "MultiVideoPlayer with 3 perpectives loaded")

## Important notice ( about the project and about me)

By now the project is in an early stage of development. So, If you want to help me below you can find the next implementations that I want to add to the project. I'm completely open to need ideas or comments about this project, feel free to contact me in my personal e-mail.

I'm pretty new in the Javascript world but I'm doing my best to learn this language,  so I'm sure that there are a lot of things that can be done much better or that are completely wrong. You can punch me in the face or help me out, that is a decision for you to make.

## How to use

For using this project on your local machine you should have npm manager installed, install the dependencies and run 'index.js' or "npm run start"

For the video player, I'm using "dash.js" as it has adaptive streaming capabilities for a good cross-browser experience.

One of the first problems that I had when I started to study "dash.js" is the video file format that it needs to work properly. You can give to the player a plain mp4 but if you want to unleash the capabilities of dash.js you need a manifest (.mpd), render the different qualities (1080p, 720p, 540p, 360p, etc..) and create an audio file. If you want to generate your own videos from your raw recordings you should take a look at FFmpeg and shaka packager projects. I made a python script to render and package everything in the same step. If you want to use that(or help me improve that) here you have the [link](https://github.com/Olcina/Py2DASH)  to the repository. I also added to the repository an open video ready to be played with the MultiVideoPlayer.

There's some key bindings

## CONTRIBUTING

I've made a file with the task that I'm going to develop next, if you want to help look at them here [CONTRIBUTING.md](./CONTRIBUTING.md)