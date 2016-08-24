var cntrlIsPressed = false;

function keyDownHandler(event) {
    if(event.which=="18") cntrlIsPressed = true;
}

function keyUpHandler(event) {
    if(event.which=="18") cntrlIsPressed = false;
}

function initIframeListeners() {
    var iframe = document.getElementById("ad");
    if (iframe) {
        iframe.contentWindow.document.body.addEventListener("keydown", keyDownHandler);
        iframe.contentWindow.document.body.addEventListener("keyup", keyUpHandler);
        iframe.contentWindow.document.body.addEventListener("click", takeScreenshot);
    }
}

function takeScreenshot(event) {
    if (cntrlIsPressed) {
        var iframe = document.getElementById("ad");
        var boundingRect = iframe.getBoundingClientRect();
        chrome.extension.sendMessage({
            dimensions: {
                top: boundingRect.top,
                left: boundingRect.left,
                width: boundingRect.right - boundingRect.left,
                height: boundingRect.bottom - boundingRect.top
            }
        }, function(dataURL) {
            iframe.dispatchEvent(new CustomEvent("screenshotTaken", {
                "detail": {
                    "dataURL" : dataURL,
                    "clientX" : event.clientX,
                    "clientY" : event.clientY
                }
            }));
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    document.body.addEventListener("iframeLoaded", initIframeListeners);
});




