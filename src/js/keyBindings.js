window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case '0':
            controler.add(0, url)
            refreshLayout(layout, controler)
            break;
        case '1':
            controler.add(1, url)
            refreshLayout(layout, controler)
            break;
        case '2':
            controler.add(2, url)
            refreshLayout(layout, controler)
            break;
        case '3':
            controler.add(3, url)
            refreshLayout(layout, controler)
            break;
        case 's':
            modal.style.display = "block";
        case 'm':
            controler.toogleGlobalMute();
            layout.muteButton(controler.controllerMuted);
            break;
        case "ArrowLeft":
            // Do something for "left arrow" key press.

            controler.seekBackward(10);
            break;
        case "ArrowRight":
            // Do something for "right arrow" key press.
            controler.seekForward(10)
            break;
        case " ":
            // Do something for "espace" key press.
            controler.tooglePlay();
            layout.playButton(controler.controllerPlaying);
            break;
        default:
            console.log(event.key)
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);