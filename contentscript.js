function takeScreenshot() {
    var iframe = document.getElementById("ad");
    var boundingRect = iframe.getBoundingClientRect();
    chrome.extension.sendMessage({
        dimensions: {
            top: boundingRect.top,
            left: boundingRect.left,
            width: boundingRect.right - boundingRect.left,
            height: boundingRect.bottom - boundingRect.top
        }
    }, function (dataURL) {
        iframe.dispatchEvent(new CustomEvent("screenshotTaken", {
            "detail": dataURL
        }));
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // For extension existence check
    var indicator = document.createElement("div");
    indicator.dataset.extensionid = "lbpcakpdeaognemhbgccjgihlmbmahmk";
    document.body.appendChild(indicator);

    document.body.addEventListener("iframeLoaded", function() {
        document.getElementById("HTMLAdTest-pause").addEventListener("click", function() {
            takeScreenshot();
        })
    });
});




