var cntrlIsPressed = false;
var canvas;

document.body.addEventListener("keydown", function(event) {
    if(event.which=="18") {
        cntrlIsPressed = true;
    }
});

document.body.addEventListener("keyup", function(event) {
    if(event.which=="18") {
        cntrlIsPressed = false;
    }
});

document.body.addEventListener("click", function() {
    if (cntrlIsPressed) {
        chrome.extension.sendMessage({
            dimensions: {
                top: 0,
                left: 0,
                width: 100,
                height: 100
            }
        }, function(dataURL) {
            document.getElementById("ad").dispatchEvent(new CustomEvent("screenshotTaken", {
                "dataURL": dataURL
            }));
        });
    }

});