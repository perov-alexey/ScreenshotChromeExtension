chrome.extension.onMessage.addListener(function(request, sender, callback) {
    capture(sender.tab.id, request.dimensions, callback);
    return true;
});

function capture(tabId, dimensions, callback) {
    chrome.tabs.get(tabId, function(tab) {
        chrome.tabs.captureVisibleTab(tab.windowId, {
            format: "png"
        }, function(dataUrl) {
            var canvas = document.createElement("canvas");
            var image = new Image();

            image.onload = function() {
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;
                var context = canvas.getContext("2d");
                context.drawImage(image,
                    dimensions.left, dimensions.top,
                    dimensions.width, dimensions.height,
                    0, 0,
                    dimensions.width, dimensions.height
                );
                callback(canvas.toDataURL("image/png"));
            };

            image.src = dataUrl;
        });
    });
}


